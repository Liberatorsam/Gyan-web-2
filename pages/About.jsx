import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Compass, Award, BookOpen, Scale, Users, Globe2, Leaf, ShieldCheck, HandHeart, Sparkles, Lightbulb, Megaphone, Heart, Star, Rocket, UserRound, UsersRound, Link2, Home, ClipboardCheck, Network, Handshake } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CORE_VALUES, OBJECTIVES, ORG, FOCUS_AREAS, YOUTH_EMPOWERMENT_DETAIL } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const ICONS = { ShieldCheck, HandHeart, Users, Globe2, Sparkles, Megaphone, Leaf, Award, Eye, ClipboardCheck, Scale, Heart, Lightbulb, UserRound, UsersRound, Link2, Home, BookOpen, Network, Handshake, Star, Rocket, Target, Compass };

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About GYAN"
        title="A movement for youth and adolescent development"
        description="A non-governmental, non-profit, non-partisan, youth- and adolescent-focused, development-oriented and volunteer-driven organization."
        image={IMAGES.volunteers}
        crumb="About"
      />

      {/* WHO WE ARE */}
      <section className="py-20 lg:py-28">
        <div className="container-gyan grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image src={IMAGES.climateAction} alt="Young people working together on a community project" className="w-full aspect-[3/2]" fittingType="fill" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 ascent-line rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">From a Sierra Leone initiative to a global network</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Global Youth & Adolescents Network (GYAN) is a youth- and adolescent-focused organization committed to advancing the rights, leadership, participation, wellbeing, education, protection and development of young people.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              GYAN creates opportunities for young people and adolescents to develop their potential, participate in decision-making, advocate for their rights and contribute to positive change. Through advocacy, capacity building, partnerships, community initiatives and youth-led programmes, GYAN promotes inclusive and sustainable development.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              The organization is committed to transparency, accountability, safeguarding, ethical leadership and meaningful youth participation. GYAN believes that young people are not merely the leaders of tomorrow; they are active leaders, changemakers and contributors shaping the world today.
            </p>
            <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">Geographical Scope</p>
              <p className="text-sm text-muted-foreground leading-relaxed">GYAN is established in Sierra Leone, with the ambition to develop chapters and structures across the country and progressively expand its work through regional and international partnerships.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-muted/40 p-5 text-center">
                <p className="text-2xl font-extrabold text-primary">{ORG.established}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Established</p>
              </div>
              <div className="rounded-2xl bg-muted/40 p-5 text-center">
                <p className="text-2xl font-extrabold text-primary">17</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Programme Areas</p>
              </div>
              <div className="rounded-2xl bg-muted/40 p-5 text-center">
                <p className="text-2xl font-extrabold text-primary">SL</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Head Office</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision-mission" className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="Our Direction" title="Vision & Mission" />
          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6"><Eye className="h-7 w-7" /></div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">A society where every young person and adolescent is empowered, protected, heard and given meaningful opportunities to reach their full potential.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald mb-6"><Compass className="h-7 w-7" /></div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">To empower young people and adolescents through leadership development, education, advocacy, participation, protection and community engagement while creating platforms through which they can contribute to sustainable development and positive social change.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUR FOCUS AREAS */}
      <section id="focus-areas" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Four Focus Areas" title="One Shared Purpose" description="Everything GYAN does flows through four focus areas that work together for the development of young people and adolescents." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOCUS_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{area.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Youth Empowerment</h3>
              {YOUTH_EMPOWERMENT_DETAIL.map((para, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed text-pretty mb-4 last:mb-0">{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="core-values" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="What We Stand For" title="Our Core Values" description="Derived from GYAN's constitution, these values guide our culture, decisions and partnerships." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map((value, i) => {
              const Icon = ICONS[value.icon] || Star;
              return (
                <Reveal key={value.title} delay={(i % 3) * 0.05}>
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
        </div>
      </section>

      {/* OBJECTIVES */}
      <section id="objectives" className="py-20 lg:py-28 bg-onyx text-white">
        <div className="container-gyan">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-accent rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our Goals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance">Key Areas of Focus</h2>
            <p className="mt-5 text-lg text-white/70 text-pretty">The key areas of focus that define GYAN's work across every programme area.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OBJECTIVES.map((obj, i) => (
              <Reveal key={obj} delay={(i % 3) * 0.04}>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-onyx text-sm font-bold">{i + 1}</span>
                  <span className="text-sm font-medium text-white/90">{obj}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/programmes" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-onyx transition-all hover:brightness-105 active:scale-95">
              See How We Deliver These <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}