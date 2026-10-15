import React, { useState } from "react";
import { Loader2, Heart, ShieldCheck, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function DonationWidget() {
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    const value = custom ? Number(custom) : amount;
    if (!Number.isFinite(value) || value < 1) {
      setError("Please enter an amount of $1 or more.");
      return;
    }
    setError("");
    setLoading(true);

    // In the builder preview (iframe) checkout must open in a new tab;
    // the tab opens synchronously in the click handler before any await.
    const isFramed = window.self !== window.top;
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setLoading(false);
      setError("Allow pop-ups to continue to checkout.");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    try {
      const res = await base44.functions.invoke("createPaypalDonation", { amount: value, frequency });
      const url = res.data?.url;
      if (!url) throw new Error("No checkout URL");
      if (checkoutTab) {
        checkoutTab.location.replace(url);
        setLoading(false);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      if (checkoutTab) checkoutTab.close();
      setError("We couldn't start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-white p-7 shadow-xl shadow-black/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-onyx">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Make a Donation</h3>
          <p className="text-xs text-muted-foreground">Secure checkout powered by PayPal</p>
        </div>
      </div>

      {/* Frequency toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1.5 mb-5">
        {[
          { key: "once", label: "One-time" },
          { key: "monthly", label: "Monthly" },
        ].map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setFrequency(opt.key)}
            className={`rounded-lg py-2.5 text-sm font-semibold transition-all ${
              frequency === opt.key ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Amount presets */}
      <label className="block text-sm font-medium mb-2">Choose an amount (USD)</label>
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        {PRESET_AMOUNTS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => { setAmount(value); setCustom(""); }}
            className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
              !custom && amount === value
                ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                : "border-border bg-white text-foreground/80 hover:border-primary/40"
            }`}
          >
            ${value}
          </button>
        ))}
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Other"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label="Custom donation amount"
        />
      </div>

      {error && <p className="text-sm text-destructive mb-3">{error}</p>}

      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Starting checkout...</> : <><Heart className="h-4 w-4" /> Donate {custom ? `$${Number(custom)}` : `$${amount}`}{frequency === "monthly" ? " / month" : ""}</>}
      </button>

      <div className="mt-5 flex items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald" /> Encrypted &amp; secure</span>
        {frequency === "monthly" && (
          <span className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5 text-primary" /> Cancel anytime</span>
        )}
      </div>
    </div>
  );
}