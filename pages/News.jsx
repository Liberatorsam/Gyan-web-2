import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Newspaper, Calendar, ArrowRight, Filter } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { IMAGES } from "@/lib/gyanImages";

const CATEGORIES = ["All", "News", "Events", "Programmes", "Youth Voices", "Research", "Advocacy", "Community Stories", "Announcements"];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    base44.entities.NewsArticle.filter({}, { sort: "-date", limit: 50 })
      .then((p) => setArticles(p.items || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="Stories, updates and announcements"
        description="The latest from GYAN's programmes, events, youth voices, research and community stories."
        image={IMAGES.hero}
        crumb="News & Updates"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          <div className="flex items-center gap-2 flex-wrap mb-10">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{c === "All" ? "All categories" : c}</button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-80 rounded-2xl bg-muted/40 animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              title="No stories yet"
              description="News, events and stories from GYAN's work will appear here once they are published by our team."
              action={<Link to="/programmes" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">Explore Our Programmes <ArrowRight className="h-4 w-4" /></Link>}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <Reveal key={a.id} delay={(i % 3) * 0.05}>
                  <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                    {a.featured_image && (
                      <div className="overflow-hidden aspect-[16/10]">
                        <Image src={a.featured_image} alt={a.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{a.category}</span>
                        {a.date && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {a.date}</span>}
                      </div>
                      <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
                      {a.summary && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.summary}</p>}
                      {a.author && <p className="mt-4 text-xs text-muted-foreground">By {a.author}</p>}
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