import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Heart, ShieldCheck, Activity, Scale, Leaf, HandHeart, Microscope, Cpu, TrendingUp, Gavel, Handshake, Home, Vote, Recycle, Globe, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PROGRAMMES } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const ICONS = { GraduationCap, Users, Heart, ShieldCheck, Activity, Scale, Leaf, HandHeart, Microscope, Cpu, TrendingUp, Gavel, Handshake, Home, Vote, Recycle, Globe };

export default function Programmes() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Seventeen programme areas for lasting change"
        description="GYAN's programme areas come from our constitutional framework — a multi-sectoral approach connecting education, protection, health, climate, economic empowerment and more."
        image={IMAGES.adolescentEducation}
        crumb="Programmes"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Programme Areas" title="Explore our programmes" description="Each programme area advances specific objectives aligned with the Sustainable Development Goals." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMMES.map((p, i) => {
              const Icon = ICONS[p.icon] || Star;
              return (
                <Reveal key={p.title} delay={(i % 3) * 0.05}>
                  <div className="group h-full flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                    <Link to="/get-involved" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-primary text-white">
        <div className="container-gyan text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Want to support a specific programme?</h2>
          <p className="mt-5 text-lg text-white/80 text-pretty">Partner with GYAN, volunteer your skills, or direct your support to the programme area you care about most.</p>
          <Link to="/get-involved" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-onyx transition-all hover:brightness-105 active:scale-95">
            Get Involved <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}