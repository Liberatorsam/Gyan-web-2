import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, MapPin, Calendar, Users, ArrowRight, Filter } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { IMAGES } from "@/lib/gyanImages";

const STATUSES = ["all", "ongoing", "completed", "upcoming"];

const STATUS_STYLES = {
  ongoing: "bg-emerald/10 text-emerald border-emerald/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  upcoming: "bg-accent/15 text-onyx border-accent/30"
};

export default function OurWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const query = filter === "all" ? {} : { status: filter };
    base44.entities.Project.filter(query, { sort: "-created_date", limit: 50 })
      .then((page) => setProjects(page.items || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Projects driving change in communities"
        description="GYAN's projects turn our programme areas into real, measurable impact for young people and adolescents."
        image={IMAGES.climateAction}
        crumb="Our Work"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    filter === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="Our programmes and projects are growing"
              description="Check back soon to discover GYAN's latest work. Projects will appear here once they are published by our team."
              action={
                <Link to="/programmes" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                  Explore Our Programmes <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.05}>
                  <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                    {p.image_url && (
                      <div className="overflow-hidden aspect-[16/10]">
                        <Image src={p.image_url} alt={p.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[p.status] || ""}`}>{p.status}</span>
                        {p.programme_area && <span className="text-xs text-muted-foreground">{p.programme_area}</span>}
                      </div>
                      <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                      {p.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.description}</p>}
                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground flex-1">
                        {p.location && <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {p.location}</div>}
                        {p.target_beneficiaries && <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {p.target_beneficiaries}</div>}
                        {p.start_date && <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {p.start_date}{p.end_date ? ` → ${p.end_date}` : ""}</div>}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}