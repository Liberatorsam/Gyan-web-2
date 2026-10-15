import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ShieldAlert, FileText, ArrowRight, Lock, Eye, PhoneCall } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SAFEGUARDING_ZEROTOLERANCE, SAFEGUARDING_PROCEDURES } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

export default function Safeguarding() {
  return (
    <>
      <PageHero
        eyebrow="Safeguarding & Child Protection"
        title="Safety, dignity and wellbeing come first"
        description="Safeguarding is a core institutional responsibility of GYAN. We hold a zero-tolerance position on all forms of abuse, exploitation and harm against children and adolescents."
        image={IMAGES.adolescentEducation}
        crumb="Safeguarding"
      />

      {/* ZERO TOLERANCE */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Our Commitment" title="Zero tolerance" description="GYAN holds a zero-tolerance position on the following:" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SAFEGUARDING_ZEROTOLERANCE.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 0.04}>
                <div className="flex items-center gap-3 rounded-xl border border-destructive/15 bg-destructive/5 px-5 py-4">
                  <ShieldAlert className="h-5 w-5 text-destructive shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="How We Operate" title="Our safeguarding procedures" description="Robust systems keep children, adolescents and everyone connected to GYAN safe." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAFEGUARDING_PROCEDURES.map((p, i) => (
              <Reveal key={p} delay={(i % 3) * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">{i + 1}</div>
                  <span className="text-sm font-medium">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTING */}
      <section className="py-20 lg:py-28 bg-primary text-white">
        <div className="container-gyan">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 mb-6"><ShieldCheck className="h-8 w-8 text-accent" /></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">Report a safeguarding concern</h2>
            <p className="mt-5 text-lg text-white/80 text-pretty max-w-2xl mx-auto">Everyone has a role to play in keeping children and adolescents safe. If you have a concern, please report it through appropriate, confidential channels.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-onyx transition-all hover:brightness-105 active:scale-95">
                <PhoneCall className="h-5 w-5" /> Report a Safeguarding Concern
              </Link>
              <Link to="/resources#publications" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 active:scale-95">
                <FileText className="h-5 w-5" /> Read Safeguarding Policy
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/60 max-w-xl mx-auto">A dedicated, secure reporting mechanism with appropriate privacy controls will be implemented separately. Sensitive safeguarding information is not collected through the general public contact form.</p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan grid sm:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: "Confidentiality", desc: "Reports are handled with strict confidentiality and care." },
            { icon: Eye, title: "Transparency", desc: "Clear procedures ensure concerns are seen and acted upon." },
            { icon: ShieldCheck, title: "Accountability", desc: "Everyone connected to GYAN shares responsibility for safeguarding." }
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="text-center rounded-3xl border border-border bg-white p-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5"><c.icon className="h-7 w-7" /></div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}