import React from "react";
import { MapPin, Globe2, Building2, Network, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SIERRA_LEONE_STRUCTURES, INTERNATIONAL_STRUCTURES, REGIONS } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

export default function Reach() {
  return (
    <>
      <PageHero
        eyebrow="Our Reach"
        title="From Sierra Leone to the world"
        description="GYAN is designed to grow from a Sierra Leone-founded initiative into a regional and international network — with strong local ownership at every step."
        image={IMAGES.climateAction}
        crumb="Our Reach"
      />

      {/* SIERRA LEONE */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <Reveal>
              <div className="flex items-center gap-2 mb-4"><span className="h-px w-8 ascent-line rounded-full" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">National Structure</span></div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Sierra Leone structures</h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-pretty">GYAN's foundation is rooted in Sierra Leone, with a structure designed to reach communities at every level — from the national secretariat to school and youth chapters.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold"><MapPin className="h-4 w-4" /> Head Office: Sierra Leone</div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4">
                {SIERRA_LEONE_STRUCTURES.map((s) => (
                  <div key={s} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></div>
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL */}
      <section className="py-20 lg:py-28 bg-onyx text-white">
        <div className="container-gyan">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><span className="h-px w-8 bg-accent rounded-full" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Global Ambition</span></div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance">International structures</h2>
            <p className="mt-5 text-lg text-white/70 text-pretty">As GYAN grows, it may develop international structures to coordinate and deliver its mission across regions. These are planned structures — not current operations everywhere listed.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERNATIONAL_STRUCTURES.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent"><Network className="h-5 w-5" /></div>
                  <span className="text-sm font-medium text-white/90">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Possible Regional Reach" title="Regions GYAN may grow into" description="These represent possible areas of future regional presence — not current operations in every region listed." />
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {REGIONS.map((r, i) => (
              <Reveal key={r} delay={(i % 4) * 0.04}>
                <div className="group flex flex-col items-center text-center rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white"><Globe2 className="h-6 w-6" /></div>
                  <span className="text-sm font-medium">{r}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">GYAN does not imply it currently operates in all these locations. These reflect the organization's planned growth architecture.</p>
          </Reveal>
          <div className="mt-10 text-center">
            <Link to="/get-involved#partnerships" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white transition-all hover:bg-primary/90 active:scale-95">
              Partner With GYAN <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}