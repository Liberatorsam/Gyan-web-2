import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, ShieldCheck, HandHeart, Users, Globe2,
  Sparkles, Megaphone, Leaf, GraduationCap, Heart, Star, Rocket
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import { PROGRAMMES, CORE_VALUES, YOUTH_PARTICIPATION_MECHANISMS, SUPPORT_OPTIONS, ORG } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const VALUE_ICONS = { ShieldCheck, HandHeart, Users, Globe2, Sparkles, Megaphone, Leaf, GraduationCap, Heart, Star, Rocket, BookOpen };

export default function Home() {
  const [projectCount, setProjectCount] = useState(null);

  useEffect(() => {
    base44.entities.Project.count({})
      .then(setProjectCount)
      .catch(() => setProjectCount(0));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="Young people participating in a collaborative leadership and education workshop" className="h-full w-full" fittingType="fill" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        </div>
        <div className="relative container-gyan py-32 lg:py-40 text-white">
          <motion.div className="flex items-center gap-2 mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="h-px w-8 bg-accent rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Global Youth & Adolescents Network · Est. {ORG.established}</span>
          </motion.div>
          <motion.h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] text-balance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Empowering Future Generations
          </motion.h1>
          <motion.p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/85 text-pretty leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            A society where every young person and adolescent is empowered, protected, heard and given meaningful opportunities to reach their full potential.
          </motion.p>
          <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <Link to="/get-involved" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-onyx shadow-lg transition-all hover:shadow-xl hover:brightness-105 active:scale-95">
              Get Involved <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/programmes" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-sm px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/15 active:scale-95">
              Explore Our Programmes
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px ascent-line" />
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-3xl bg-accent/20 -z-10" />
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <Image src={IMAGES.adolescentEducation} alt="Adolescents learning together in a bright classroom" className="w-full aspect-[4/3]" fittingType="fill" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-2xl bg-white p-5 shadow-xl border border-border max-w-[14rem]">
                <p className="text-2xl font-extrabold text-primary">17</p>
                <p className="text-sm text-muted-foreground mt-1">Programme areas aligned with the SDGs</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 ascent-line rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">
              A global network built by and for young people
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              <strong className="text-foreground">Global Youth & Adolescents Network (GYAN)</strong> is a youth- and adolescent-focused organization committed to advancing the rights, leadership, participation, wellbeing, education, protection and development of young people.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              GYAN creates opportunities for young people and adolescents to develop their potential, participate in decision-making, advocate for their rights and contribute to positive change. Through advocacy, capacity building, partnerships, community initiatives and youth-led programmes, GYAN promotes inclusive and sustainable development.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95">
              Learn More About GYAN <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision-mission" className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="Our Direction" title="Vision & Mission" description="These define the core direction of GYAN and guide everything we do." />
          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="group h-full rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                  <Globe2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  A society where every young person and adolescent is empowered, protected, heard and given meaningful opportunities to reach their full potential.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="group h-full rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald mb-6">
                  <Rocket className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  To empower young people and adolescents through leadership development, education, advocacy, participation, protection and community engagement while creating platforms through which they can contribute to sustainable development and positive social change.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CORE VALUES PREVIEW */}
      <section id="core-values" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="What We Stand For" title="Our Core Values" description="Derived from GYAN's constitution, these values guide our culture, decisions and partnerships." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.slice(0, 8).map((value, i) => {
              const Icon = VALUE_ICONS[value.icon] || Star;
              return (
                <Reveal key={value.title} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold leading-snug">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link to="/about#core-values" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View all {CORE_VALUES.length} values <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMMES PREVIEW */}
      <section className="py-20 lg:py-28 bg-onyx text-white">
        <div className="container-gyan">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-accent rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance">Seventeen programme areas for lasting impact</h2>
            <p className="mt-5 text-lg text-white/70 text-pretty leading-relaxed">A multi-sectoral approach that connects education, protection, health, climate, economic empowerment and more — grounded in GYAN's constitutional framework.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMMES.slice(0, 6).map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <Link to="/programmes" className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">{p.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/programmes" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-onyx transition-all hover:brightness-105 active:scale-95">
              Explore All Programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="container-gyan relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="h-px w-8 bg-accent rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our Reach</span>
              <span className="h-px w-8 bg-accent rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance">Impact in progress</h2>
            <p className="mt-5 text-lg text-white/75 text-pretty">GYAN is a young organization. As our programmes grow, real statistics will appear here — animated when the numbers are real.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-8">
            <StatCounter value={null} label="Young People Reached" />
            <StatCounter value={null} label="Communities Engaged" />
            <StatCounter value={null} label="Volunteers" />
            <StatCounter value={projectCount ?? null} label="Projects Implemented" />
            <StatCounter value={null} label="Countries Reached" />
          </div>
          <p className="mt-12 text-center text-sm text-white/50">Statistics will be updated through the admin system as data becomes available.</p>
        </div>
      </section>

      {/* YOUTH PARTICIPATION */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 ascent-line rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Meaningful Participation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">Youth Voices. Youth Leadership. Youth Action.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">GYAN promotes the meaningful, safe, inclusive and age-appropriate participation of young people and adolescents at every level of our work.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Meaningful", "Safe", "Inclusive", "Age-appropriate"].map((tag) => (
                <span key={tag} className="rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold">{tag}</span>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {YOUTH_PARTICIPATION_MECHANISMS.map((m) => (
                <div key={m.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image src={IMAGES.youthLeader} alt="Young youth leader speaking confidently" className="w-full aspect-[4/5]" fittingType="fill" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SAFEGUARDING HIGHLIGHT */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-gyan">
          <div className="rounded-3xl border border-primary/15 bg-white/70 backdrop-blur p-8 lg:p-14 text-center max-w-4xl mx-auto">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">Safeguarding is at the centre of everything we do</h2>
            <p className="mt-5 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">GYAN holds a zero-tolerance position on all forms of abuse, exploitation and harm against children and adolescents. Their safety, dignity and wellbeing come first.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/safeguarding" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95">
                Read Safeguarding Policy
              </Link>
              <Link to="/safeguarding" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/30 px-6 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/5 active:scale-95">
                Report a Safeguarding Concern
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GET INVOLVED CTA */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Get Involved" title="Many ways to make a difference" description="Whether you have time, skills, resources or a partnership to offer — there's a place for you in GYAN's mission." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPORT_OPTIONS.map((opt, i) => {
              const Icon = VALUE_ICONS[opt.icon] || Star;
              return (
                <Reveal key={opt.title} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-7 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-accent/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-onyx mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{opt.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{opt.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link to="/get-involved" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white transition-all hover:bg-primary/90 active:scale-95">
              Get Involved Today <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}