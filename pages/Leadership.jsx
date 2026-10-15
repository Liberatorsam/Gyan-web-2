import React, { useState, useEffect } from "react";
import { Users, Landmark, Network, Lightbulb, Briefcase, ShieldCheck, Star, UserRound } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";
import { GOVERNANCE, BOARD_COMMITTEES, STAFF_POSITIONS } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const GOV_ICONS = { Users, Landmark, Network, Lightbulb, Briefcase };

export default function Leadership() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.TeamMember.filter({}, { sort: "order", limit: 50 })
      .then((p) => setTeam(p.items || []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Leadership & Governance"
        title="Governance and management at GYAN"
        description="A clear structure that separates governance from management — ensuring accountability, integrity and strategic direction."
        image={IMAGES.youthLeader}
        crumb="Leadership & Governance"
      />

      {/* GOVERNANCE STRUCTURE */}
      <section id="governance" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Governance" title="Our governance structure" description="GYAN's governance bodies provide strategic direction, oversight and accountability." />
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            {GOVERNANCE.map((g, i) => {
              const Icon = GOV_ICONS[g.icon] || Star;
              return (
                <Reveal key={g.title} delay={(i % 2) * 0.05}>
                  <div className="group h-full rounded-3xl border border-border bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 transition-colors group-hover:bg-primary group-hover:text-white"><Icon className="h-7 w-7" /></div>
                    <h3 className="text-xl font-bold mb-2">{g.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{g.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Board committees */}
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-8">
              <h3 className="text-xl font-bold mb-2">Board Committees</h3>
              <p className="text-muted-foreground mb-6">Specialized committees support the Board in key areas of governance and oversight.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BOARD_COMMITTEES.map((c) => (
                  <div key={c} className="flex items-center gap-3 rounded-xl bg-white border border-border px-4 py-3.5">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GOVERNANCE VS MANAGEMENT */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="How We're Organized" title="Governance vs. management" description="A clear distinction keeps our oversight and operations accountable." />
          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full rounded-3xl border border-primary/20 bg-white p-8">
                <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide mb-5">Governance</span>
                <h3 className="text-xl font-bold mb-3">Strategic oversight & accountability</h3>
                <ul className="space-y-2.5 text-muted-foreground">
                  <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> General Assembly</li>
                  <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Board of Directors</li>
                  <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Board Committees</li>
                  <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Advisory Council</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-emerald/20 bg-white p-8">
                <span className="inline-block rounded-full bg-emerald/10 text-emerald px-4 py-1.5 text-xs font-semibold uppercase tracking-wide mb-5">Management</span>
                <h3 className="text-xl font-bold mb-3">Day-to-day operations & delivery</h3>
                <ul className="space-y-2.5 text-muted-foreground">
                  <li className="flex gap-2"><Briefcase className="h-5 w-5 text-emerald shrink-0" /> Executive Director</li>
                  <li className="flex gap-2"><Briefcase className="h-5 w-5 text-emerald shrink-0" /> Core staff team</li>
                  <li className="flex gap-2"><Briefcase className="h-5 w-5 text-emerald shrink-0" /> Programme delivery</li>
                  <li className="flex gap-2"><Briefcase className="h-5 w-5 text-emerald shrink-0" /> Volunteers & coordinators</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Our Team" title="Core staff structure" description="GYAN's constitution provides for an initial maximum of ten core paid staff positions, subject to funding." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAFF_POSITIONS.map((pos, i) => (
              <Reveal key={pos} delay={(i % 3) * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground"><UserRound className="h-5 w-5" /></div>
                  <span className="text-sm font-medium">{pos}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-xl font-bold mb-6 text-center">Our People</h3>
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="h-64 rounded-2xl bg-muted/40 animate-pulse" />)}</div>
            ) : team.length === 0 ? (
              <EmptyState
                icon={Users}
                title="Team members will be introduced soon"
                description="Actual people will appear here once their names, photographs and biographies have been officially supplied. GYAN does not publish fictional staff."
                className="max-w-2xl mx-auto"
              />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((m, i) => (
                  <Reveal key={m.id} delay={(i % 4) * 0.05}>
                    <div className="group text-center">
                      <div className="overflow-hidden rounded-3xl mb-4">
                        {m.photo_url ? (
                          <Image src={m.photo_url} alt={m.name} className="w-full aspect-square transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                        ) : (
                          <div className="w-full aspect-square bg-muted flex items-center justify-center"><UserRound className="h-12 w-12 text-muted-foreground" /></div>
                        )}
                      </div>
                      <h4 className="font-semibold">{m.name}</h4>
                      <p className="text-sm text-primary font-medium">{m.position}</p>
                      {m.bio && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{m.bio}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}