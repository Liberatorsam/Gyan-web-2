import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Receiving PayPal account — kept server-side so it is never visible to donors.
const PAYPAL_BUSINESS_EMAIL = "simplesam03006@gmail.com";

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount);
    const frequency = body.frequency === "monthly" ? "monthly" : "one_time";

    if (!Number.isFinite(amount) || amount < 1) {
      return Response.json({ error: "Minimum donation is $1." }, { status: 400 });
    }
    if (amount > 100000) {
      return Response.json({ error: "For gifts of $100,000 or more, please contact us directly." }, { status: 400 });
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const return_url = origin + "/donate?donated=1";
    const cancel_url = origin + "/donate?canceled=1";

    const params = new URLSearchParams({
      business: PAYPAL_BUSINESS_EMAIL,
      currency_code: "USD",
      no_shipping: "1",
      rm: "1",
      return: return_url,
      cancel_return: cancel_url,
    });

    let url;
    if (frequency === "monthly") {
      params.set("cmd", "_xclick-subscriptions");
      params.set("item_name", "Monthly Donation to GYAN");
      params.set("a3", String(amount));
      params.set("p3", "1");
      params.set("t3", "M");
      params.set("src", "1");
      params.set("sra", "1");
      url = "https://www.paypal.com/cgi-bin/webscr?" + params.toString();
    } else {
      params.set("cmd", "_donations");
      params.set("item_name", "Donation to GYAN");
      params.set("amount", String(amount));
      url = "https://www.paypal.com/cgi-bin/webscr?" + params.toString();
    }

    // Record the donation as pending — the PayPal account owner can confirm
    // it in their PayPal dashboard; an IPN listener can automate this later.
    const record = {
      amount_cents: Math.round(amount * 100),
      currency: "usd",
      frequency,
      status: "pending",
    };
    await base44.asServiceRole.entities.Donation.create(record);

    return Response.json({ url });
  } catch (error) {
    console.error("PayPal donation error:", error?.message);
    return Response.json({ error: "Something went wrong starting checkout." }, { status: 500 });
  }
}