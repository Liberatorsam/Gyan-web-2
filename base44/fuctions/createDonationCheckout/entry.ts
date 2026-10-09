import { secrets } from "base44:runtime";

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const amountCents = Math.round(Number(body.amount) * 100);
    const frequency = body.frequency === "monthly" ? "monthly" : "once";

    if (!Number.isFinite(amountCents) || amountCents < 100) {
      return Response.json({ error: "Minimum donation is $1." }, { status: 400 });
    }
    if (amountCents > 10000000) {
      return Response.json({ error: "For gifts of $10,000 or more, please contact us directly." }, { status: 400 });
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const mode = frequency === "monthly" ? "subscription" : "payment";

    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("success_url", origin + "/donate?donated=1");
    params.set("cancel_url", origin + "/donate?canceled=1");
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(amountCents));
    params.set("line_items[0][price_data][product_data][name]", "Donation to GYAN");
    if (frequency === "monthly") {
      params.set("line_items[0][price_data][recurring][interval]", "month");
      params.set("subscription_data[metadata][base44_app_id]", secrets.get("BASE44_APP_ID"));
    } else {
      params.set("submit_type", "donate");
    }
    params.set("metadata[base44_app_id]", secrets.get("BASE44_APP_ID"));

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secrets.get("STRIPE_SECRET_KEY")}`,
        "Stripe-Version": "2025-10-29.clover",
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: params,
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Stripe checkout session failed:", data?.error?.message);
      return Response.json({ error: data?.error?.message || "Payment setup failed." }, { status: 502 });
    }

    return Response.json({ url: data.url });
  } catch (error) {
    console.error("Donation checkout error:", error?.message);
    return Response.json({ error: "Something went wrong starting checkout." }, { status: 500 });
  }
}