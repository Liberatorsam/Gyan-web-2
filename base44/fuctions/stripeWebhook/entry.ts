import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import Stripe from 'npm:stripe@18';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return Response.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }
    const body = await req.text();

    const stripe = new Stripe(secrets.get('STRIPE_SECRET_KEY'));
    let event;
    try {
      // Web Crypto is async — must use constructEventAsync, not constructEvent.
      event = await stripe.webhooks.constructEventAsync(body, signature, secrets.get('STRIPE_WEBHOOK_SECRET'));
    } catch (err) {
      console.error('Stripe webhook signature verification failed:', err.message);
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Webhook is called without user auth — use the service role.
    const base44 = createClientFromRequest(req);
    const db = base44.asServiceRole.entities.Donation;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await db.upsert([{
        stripe_session_id: session.id,
        stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : '',
        stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : '',
        amount_cents: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        frequency: session.mode === 'subscription' ? 'monthly' : 'one_time',
        status: 'paid',
        donor_name: session.customer_details?.name ?? '',
        donor_email: session.customer_details?.email ?? session.customer_email ?? '',
        paid_at: new Date((session.created ?? event.created) * 1000).toISOString(),
      }], { key: 'stripe_session_id' });
    } else if (event.type === 'invoice.paid') {
      const invoice = event.data.object;
      // Skip the first invoice — the checkout session already recorded it.
      if (invoice.billing_reason === 'subscription_cycle') {
        let donorName = invoice.customer_name ?? '';
        let donorEmail = invoice.customer_email ?? '';
        if ((!donorName || !donorEmail) && invoice.customer) {
          try {
            const customer = await stripe.customers.retrieve(invoice.customer, {}, { timeout: 10000 });
            if (customer && !customer.deleted) {
              donorName = donorName || customer.name || '';
              donorEmail = donorEmail || customer.email || '';
            }
          } catch (e) {
            console.error('Could not retrieve Stripe customer:', e.message);
          }
        }
        await db.upsert([{
          stripe_invoice_id: invoice.id,
          stripe_subscription_id: typeof invoice.subscription === 'string' ? invoice.subscription : '',
          amount_cents: invoice.amount_paid ?? 0,
          currency: invoice.currency ?? 'usd',
          frequency: 'monthly',
          status: 'paid',
          donor_name: donorName,
          donor_email: donorEmail,
          paid_at: new Date(((invoice.created ?? 0) || event.created) * 1000).toISOString(),
        }], { key: 'stripe_invoice_id' });
      }
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      await db.updateMany(
        { stripe_payment_intent_id: typeof charge.payment_intent === 'string' ? charge.payment_intent : '' },
        { $set: { status: 'refunded' } }
      );
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook handler error:', error.message);
    return Response.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}