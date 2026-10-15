import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Image as ImageIcon, Microscope, Download, Filter, ArrowRight, BookOpen } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";
import { PROGRAMMES } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const PUB_TYPES = ["All", "Annual Report", "Policy Brief", "Research Report", "Publication", "Study", "Guide", "Newsletter", "Strategic Plan", "Programme Document"];
const GALLERY_CATS = ["All", "Community Activities", "Youth Activities", "Training", "Events", "Programmes", "Campaigns", "Environmental Activities"];

export default function Resources() {
  const [publications, setPublications] = useState([]);
  const [pubLoading, setPubLoading] = useState(true);
  const [pubFilter, setPubFilter] = useState("All");

  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryFilter, setGalleryFilter] = useState("All");

  useEffect(() => {
    setPubLoading(true);
    base44.entities.Publication.filter({}, { sort: "-year", limit: 50 })
      .then((p) => setPublications(p.items || []))
      .catch(() => setPublications([]))
      .finally(() => setPubLoading(false));
  }, []);

  useEffect(() => {
    setGalleryLoading(true);
    base44.entities.GalleryImage.filter({}, { sort: "-created_date", limit: 50 })
      .then((p) => setGallery(p.items || []))
      .catch(() => setGallery([]))
      .finally(() => setGalleryLoading(false));
  }, []);

  const filteredPubs = pubFilter === "All" ? publications : publications.filter((p) => p.type === pubFilter);
  const filteredGallery = galleryFilter === "All" ? gallery : gallery.filter((g) => g.category === galleryFilter);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Research, knowledge and resources"
        description="A growing library of research, publications, reports and visual stories from GYAN's work."
        image={IMAGES.adolescentEducation}
        crumb="Resources"
      />

      {/* RESEARCH & KNOWLEDGE */}
      <section id="research" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Research & Knowledge" title="Evidence that drives our work" description="GYAN generates research, evidence and knowledge products to inform youth-focused programming and advocacy." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Microscope, title: "Research Reports", desc: "Studies and evidence on youth and adolescent development." },
              { icon: FileText, title: "Policy Briefs", desc: "Concise analysis to inform policy and practice." },
              { icon: BookOpen, title: "Publications", desc: "Knowledge products and learning from our programmes." },
              { icon: Download, title: "Programme Learning", desc: "Evidence and lessons from delivery in communities." }
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4"><c.icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications" className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3"><span className="h-px w-8 ascent-line rounded-full" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Library</span></div>
              <h2 className="text-2xl sm:text-3xl font-bold">Publications & Reports</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select value={pubFilter} onChange={(e) => setPubFilter(e.target.value)} className="rounded-full border border-input bg-white px-4 py-2 text-sm font-medium outline-none focus:border-primary">
                {PUB_TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All types" : t}</option>)}
              </select>
            </div>
          </div>
          {pubLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-40 rounded-2xl bg-muted/40 animate-pulse" />)}</div>
          ) : filteredPubs.length === 0 ? (
            <EmptyState icon={FileText} title="No publications yet" description="Research reports, policy briefs and publications will appear here once they are published by our team." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPubs.map((pub, i) => (
                <Reveal key={pub.id} delay={(i % 3) * 0.05}>
                  <div className="group h-full flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{pub.type}</span>
                      {pub.year && <span className="text-xs text-muted-foreground">{pub.year}</span>}
                    </div>
                    <h3 className="font-semibold leading-snug">{pub.title}</h3>
                    {pub.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{pub.description}</p>}
                    {pub.file_url && <a href={pub.file_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"><Download className="h-4 w-4" /> Download</a>}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 lg:py-28">
        <div className="container-gyan">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3"><span className="h-px w-8 ascent-line rounded-full" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Visual Stories</span></div>
              <h2 className="text-2xl sm:text-3xl font-bold">Gallery</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {GALLERY_CATS.map((c) => (
                <button key={c} onClick={() => setGalleryFilter(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${galleryFilter === c ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{c === "All" ? "All" : c}</button>
              ))}
            </div>
          </div>
          {galleryLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-muted/40 animate-pulse" />)}</div>
          ) : filteredGallery.length === 0 ? (
            <EmptyState icon={ImageIcon} title="No images yet" description="Photos from community activities, training, events and campaigns will appear here once published." />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGallery.map((g, i) => (
                <Reveal key={g.id} delay={(i % 4) * 0.04}>
                  <figure className="group relative overflow-hidden rounded-2xl aspect-square">
                    <Image src={g.image_url} alt={g.caption || g.title || "Gallery image"} className="h-full w-full transition-transform duration-500 group-hover:scale-110" fittingType="fill" />
                    {(g.caption || g.title) && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm font-medium text-white">{g.caption || g.title}</p>
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal delay={0.1}>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="h-4 w-4 text-primary" /> GYAN follows photography and media consent procedures for all images involving children and adolescents.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container-gyan text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-balance">Looking for something specific?</h2>
          <p className="mt-4 text-white/80">Browse our programme areas or get in touch — we're happy to share what we're learning.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programmes" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-onyx transition-all hover:brightness-105">Explore Programmes <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}