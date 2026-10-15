import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { ORG } from "@/lib/gyanData";

const COLUMNS = [
  {
    title: "Organization",
    links: [
      { label: "About GYAN", to: "/about" },
      { label: "Vision & Mission", to: "/about#vision-mission" },
      { label: "Core Values", to: "/about#core-values" },
      { label: "Leadership", to: "/leadership" },
      { label: "Governance", to: "/leadership#governance" }
    ]
  },
  {
    title: "Programmes",
    links: [
      { label: "Education", to: "/programmes" },
      { label: "Youth Leadership", to: "/programmes" },
      { label: "Adolescent Development", to: "/programmes" },
      { label: "Child Protection", to: "/safeguarding" },
      { label: "Health & Wellbeing", to: "/programmes" },
      { label: "Climate & Environment", to: "/programmes" },
      { label: "Economic Empowerment", to: "/programmes" },
      { label: "Digital Innovation", to: "/programmes" }
    ]
  },
  {
    title: "Get Involved",
    links: [
      { label: "Membership", to: "/get-involved#membership" },
      { label: "Volunteer", to: "/get-involved#volunteer" },
      { label: "Partnership", to: "/get-involved#partnerships" },
      { label: "Support GYAN", to: "/get-involved#support" },
      { label: "Events", to: "/events" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "News", to: "/news" },
      { label: "Research", to: "/resources#research" },
      { label: "Publications", to: "/resources#publications" },
      { label: "Reports", to: "/resources#publications" },
      { label: "Gallery", to: "/resources#gallery" }
    ]
  },
  {
    title: "Important",
    links: [
      { label: "Safeguarding", to: "/safeguarding" },
      { label: "Privacy Policy", to: "/safeguarding" },
      { label: "Complaints & Feedback", to: "/contact" },
      { label: "Code of Conduct", to: "/safeguarding" },
      { label: "Terms & Policies", to: "/safeguarding" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-onyx text-white/80">
      <div className="container-gyan py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              A youth- and adolescent-focused, non-profit and development-oriented organization. Headquartered in Sierra Leone, growing into a regional and international network.
            </p>
            <p className="mt-4 text-sm font-medium text-white/70">Motto: <span className="text-accent">{ORG.motto}</span></p>
            <div className="mt-6 space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>Head Office: {ORG.headOffice}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <a href={`mailto:${ORG.email}`} className="hover:text-white transition-colors">{ORG.email}</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{ORG.website}</span>
              </div>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">© {new Date().getFullYear()} Global Youth & Adolescents Network (GYAN). All rights reserved.</p>
          <Link to="/safeguarding" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-accent transition-colors">
            <ShieldCheck className="h-4 w-4" />
            Safeguarding & Child Protection
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}