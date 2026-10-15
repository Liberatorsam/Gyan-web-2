import React, { useState } from "react";
import { Mail, MapPin, Globe, Send, Loader2, CheckCircle2, ShieldCheck, MessageSquare } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ORG } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const inputClass = "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "block text-sm font-medium mb-1.5";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "", message: "", consent: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.consent) { toast({ title: "Please accept the consent checkbox to continue.", variant: "destructive" }); return; }
    setLoading(true);
    try {
      await base44.entities.ContactMessage.create(form);
      setDone(true);
      setForm({ full_name: "", email: "", phone: "", subject: "", message: "", consent: false });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with GYAN"
        description="We'd love to hear from you — whether you have a question, a partnership idea, or want to join our mission."
        image={IMAGES.hero}
        crumb="Contact"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan grid lg:grid-cols-[1fr_1.3fr] gap-12">
          {/* Contact info */}
          <Reveal>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 ascent-line rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact Information</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight">Global Youth & Adolescents Network (GYAN)</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Reach out using the details below or send us a message. We aim to respond to all enquiries promptly.</p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-sm font-semibold">Head Office</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{ORG.headOffice}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Full address to be provided officially.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <a href={`mailto:${ORG.email}`} className="text-sm text-primary hover:underline mt-0.5 inline-block">{ORG.email}</a>
                  <p className="text-xs text-muted-foreground/70 mt-1">Update with the official email once supplied.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Globe className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-sm font-semibold">Website</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{ORG.website}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">For safeguarding concerns, please use our dedicated safeguarding channels rather than this general form.</p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-white p-7 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white"><MessageSquare className="h-5 w-5" /></div>
                <div><h3 className="text-xl font-bold">Send a message</h3><p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p></div>
              </div>
              {done ? (
                <div className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 className="h-12 w-12 text-emerald mb-4" />
                  <h3 className="text-lg font-semibold">Message sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">Thank you for reaching out to GYAN. Our team will respond to your enquiry soon.</p>
                  <button onClick={() => setDone(false)} className="mt-6 text-sm font-semibold text-primary hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Full name *</label><input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inputClass} /></div>
                    <div><label className={labelClass}>Email *</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div>
                    <div><label className={labelClass}>Subject *</label><input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Message *</label><textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} /></div>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-input accent-primary" />
                    <span className="text-xs text-muted-foreground leading-relaxed">I consent to GYAN processing my information to respond to this enquiry, in line with the privacy policy.</span>
                  </label>
                  <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-60 w-full sm:w-auto">
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <Send className="h-4 w-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}