import React from "react";
import { Link } from "react-router-dom";
import { Users, Scale, Heart, Accessibility, Sparkles, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/gyanImages";

const COMMITMENTS = [
  { icon: Scale, title: "Equal Participation", description: "Every young person has an equal right to participate, lead and be heard." },
  { icon: Sparkles, title: "Equal Opportunities", description: "We work to ensure fair access to opportunities for all, regardless of background." },
  { icon: Heart, title: "Gender Equality", description: "We advance equal rights, opportunities and outcomes for all genders." },
  { icon: Users, title: "Inclusion", description: "We create spaces where everyone belongs and can contribute fully." },
  { icon: Accessibility, title: "Non-discrimination", description: "We reject all forms of discrimination and exclusion in our work." },
  { icon: Users, title: "Meaningful Participation of Persons with Disabilities", description: "We ensure the participation of persons with disabilities and underrepresented groups." }
];

export default function Inclusion() {
  return (
    <>
      <PageHero
        eyebrow="Gender, Diversity & Inclusion"
        title="A network where everyone belongs"
        description="GYAN is committed to equal participation, equal opportunities, gender equality, inclusion and non-discrimination in everything we do."
        image={IMAGES.youthLeader}
        crumb="Inclusion"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image src={IMAGES.hero} alt="Diverse group of young people participating together" className="w-full aspect-[4/3]" fittingType="fill" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4"><span className="h-px w-8 ascent-line rounded-full" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Commitment</span></div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">Diversity is our strength</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">GYAN believes that meaningful change happens when everyone is included. We work to ensure that young people and adolescents of all genders, abilities, backgrounds and circumstances can participate, lead and thrive.</p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">Inclusion is not an add-on — it is woven into how we design programmes, build partnerships, recruit our team and engage our communities.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="What We Stand For" title="Our inclusion commitments" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-white p-7 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-emerald/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald mb-5 transition-colors group-hover:bg-emerald group-hover:text-white"><c.icon className="h-6 w-6" /></div>
                  <h3 className="text-lg font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-primary text-white">
        <div className="container-gyan text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Help us build a more inclusive future</h2>
          <p className="mt-5 text-lg text-white/80 text-pretty">Join GYAN as a member, volunteer or partner and help ensure every young person has a place and a voice.</p>
          <Link to="/get-involved" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-onyx transition-all hover:brightness-105 active:scale-95">
            Get Involved <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}