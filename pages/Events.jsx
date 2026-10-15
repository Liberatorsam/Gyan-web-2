import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin, ExternalLink, ArrowRight, CalendarCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { IMAGES } from "@/lib/gyanImages";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.Event.filter({}, { sort: "date", limit: 50 })
      .then((p) => setEvents(p.items || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date && e.date >= today);
  const past = events.filter((e) => e.date && e.date < today);

  const EventCard = ({ e }) => (
    <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-xl hover:-translate-y-1">
      {e.image_url && (
        <div className="overflow-hidden aspect-[16/9]">
          <Image src={e.image_url} alt={e.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        {e.date && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-onyx px-3 py-1 text-xs font-semibold"><CalendarDays className="h-3.5 w-3.5" /> {e.date}</span>
            {e.time && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {e.time}</span>}
          </div>
        )}
        <h3 className="text-lg font-semibold leading-snug">{e.title}</h3>
        {e.location && <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {e.location}</p>}
        {e.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{e.description}</p>}
        {e.registration_link && <a href={e.registration_link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Register <ExternalLink className="h-3.5 w-3.5" /></a>}
      </div>
    </article>
  );

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Events and gatherings"
        description="Upcoming and past events where GYAN brings young people, partners and communities together."
        image={IMAGES.volunteers}
        crumb="Events"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-72 rounded-2xl bg-muted/40 animate-pulse" />)}</div>
          ) : events.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="No events scheduled"
              description="Upcoming events will be published here once they are confirmed. Check back soon."
              action={<Link to="/get-involved" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">Get Involved <ArrowRight className="h-4 w-4" /></Link>}
            />
          ) : (
            <div className="space-y-16">
              <div>
                <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
                {upcoming.length === 0 ? (
                  <EmptyState icon={CalendarCheck} title="No upcoming events" description="There are no upcoming events right now. Check back soon." className="max-w-2xl" />
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map((e, i) => <Reveal key={e.id} delay={(i % 3) * 0.05}><EventCard e={e} /></Reveal>)}
                  </div>
                )}
              </div>
              {past.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-8">Past Events</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                    {past.map((e, i) => <Reveal key={e.id} delay={(i % 3) * 0.05}><EventCard e={e} /></Reveal>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}