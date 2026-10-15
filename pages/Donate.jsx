import React, { useState } from "react";
import { CheckCircle2, Heart, Globe2, GraduationCap, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import DonationWidget from "@/components/DonationWidget";
import { IMAGES } from "@/lib/gyanImages";

export default function Donate() {
  const donated = new URLSearchParams(window.location.search).get("donated") === "1";

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Invest in the next generation"
        description="Your donation helps GYAN create safe, inclusive and meaningful opportunities for young people and adolescents — through education, leadership, advocacy and community action."
        image={IMAGES.adolescentEducation}
        crumb="Donate"
      />

      <section className="py-20 lg:py-28">
        <div className="container-gyan">
          {donated && (
            <Reveal>
              <div className="mb-10 flex items-start gap-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Thank you for your generosity! Your donation has been received — it directly supports GYAN's youth development programmes.
                </p>
              </div>
            </Reveal>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Why Give"
                title="Every contribution creates opportunity"
                description="GYAN is a youth- and adolescent-focused, non-profit and development-oriented organization headquartered in Sierra Leone. Donations help us reach young people where they are — in schools, communities and youth-led spaces."
              />
              <div className="mt-8 space-y-4">
                {[
                  { icon: GraduationCap, title: "Education & skills", text: "Support learning opportunities, mentorship and life-skills development for adolescents and youth." },
                  { icon: Users, title: "Youth leadership & voice", text: "Fund platforms where young people participate meaningfully in decisions that affect them." },
                  { icon: Globe2, title: "Community & advocacy", text: "Back youth-led community action, environmental stewardship and advocacy campaigns." },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
                Prefer to give in another way, or representing a partner organization?{" "}
                <a href="/contact" className="font-semibold text-primary hover:underline">Contact our team</a> — we'd love to talk.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <DonationWidget />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}