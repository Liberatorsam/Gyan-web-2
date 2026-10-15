import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, Users, Handshake, Star, Sparkles, Rocket, Heart, ShieldCheck, Send, Loader2, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { MEMBERSHIP_CATEGORIES, VOLUNTEER_ROLES, PARTNER_TYPES, SUPPORT_OPTIONS, YOUTH_PARTICIPATION_MECHANISMS } from "@/lib/gyanData";
import { IMAGES } from "@/lib/gyanImages";

const OPTION_ICONS = { Heart, HandHeart, Handshake, Star, Sparkles, Rocket };

const inputClass = "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "block text-sm font-medium mb-1.5";

function ConsentNote() {
  return (
    <p className="text-xs text-muted-foreground leading-relaxed">
      GYAN works with children and adolescents. Your information is handled confidentially and in line with our safeguarding and privacy policies. By submitting, you consent to GYAN contacting you about your interest.
    </p>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-60">
      {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>{label} <Send className="h-4 w-4" /></>}
    </button>
  );
}

function SuccessNote() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
      <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
      <p className="text-sm text-foreground">Thank you! Your submission has been received. Our team will be in touch soon.</p>
    </div>
  );
}

export default function GetInvolved() {
  const { toast } = useToast();
  const [volForm, setVolForm] = useState({ full_name: "", email: "", phone: "", country: "", area_of_interest: "", skills: "", motivation: "", availability: "", consent: false });
  const [volLoading, setVolLoading] = useState(false);
  const [volDone, setVolDone] = useState(false);

  const [partForm, setPartForm] = useState({ organization_name: "", contact_person: "", email: "", country: "", organization_type: "", area_of_interest: "", proposal: "", message: "" });
  const [partLoading, setPartLoading] = useState(false);
  const [partDone, setPartDone] = useState(false);

  const [memberForm, setMemberForm] = useState({ full_name: "", email: "", country: "", category: "", message: "", consent: false });
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberDone, setMemberDone] = useState(false);

  const submitVolunteer = async (e) => {
    e.preventDefault();
    if (!volForm.consent) { toast({ title: "Please accept the consent checkbox to continue.", variant: "destructive" }); return; }
    setVolLoading(true);
    try {
      await base44.entities.VolunteerApplication.create(volForm);
      setVolDone(true);
      setVolForm({ full_name: "", email: "", phone: "", country: "", area_of_interest: "", skills: "", motivation: "", availability: "", consent: false });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setVolLoading(false);
    }
  };

  const submitPartnership = async (e) => {
    e.preventDefault();
    setPartLoading(true);
    try {
      await base44.entities.PartnershipInquiry.create(partForm);
      setPartDone(true);
      setPartForm({ organization_name: "", contact_person: "", email: "", country: "", organization_type: "", area_of_interest: "", proposal: "", message: "" });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setPartLoading(false);
    }
  };

  const submitMembership = async (e) => {
    e.preventDefault();
    if (!memberForm.consent) { toast({ title: "Please accept the consent checkbox to continue.", variant: "destructive" }); return; }
    setMemberLoading(true);
    try {
      await base44.entities.ContactMessage.create({ full_name: memberForm.full_name, email: memberForm.email, subject: `Membership Interest — ${memberForm.category || "General"}`, message: `Country: ${memberForm.country}\nCategory: ${memberForm.category}\n\n${memberForm.message}`, consent: memberForm.consent });
      setMemberDone(true);
      setMemberForm({ full_name: "", email: "", country: "", category: "", message: "", consent: false });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setMemberLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Your skills. Your time. Your impact."
        description="Volunteerism is a fundamental operating principle of GYAN. There are many ways to join our mission and help empower future generations."
        image={IMAGES.volunteers}
        crumb="Get Involved"
      />

      {/* SUPPORT OPTIONS OVERVIEW */}
      <section id="support" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Ways to Help" title="Many ways to support GYAN" description="Whether you give time, skills, resources or a partnership — every contribution matters." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPORT_OPTIONS.map((opt, i) => {
              const Icon = OPTION_ICONS[opt.icon] || Star;
              return (
                <Reveal key={opt.title} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-7 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-accent/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-onyx mb-5"><Icon className="h-6 w-6" /></div>
                    <h3 className="text-lg font-semibold">{opt.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{opt.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Give securely online</p>
                <p className="text-sm text-muted-foreground mt-1">Make a one-time or monthly donation through PayPal — every contribution supports our youth development programmes.</p>
              </div>
              <Link to="/donate" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95">
                Donate Now <Heart className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="Join Us" title="Membership" description="Membership is open to individuals and, where appropriate, organizations that support GYAN's vision, mission, objectives and values." />
          <div className="mt-14 grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-3">
                {MEMBERSHIP_CATEGORIES.map((m) => (
                  <div key={m.title} className="rounded-xl border border-border bg-white p-5">
                    <h3 className="text-sm font-semibold">{m.title}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold mb-1">Become a Member</h3>
                <p className="text-sm text-muted-foreground mb-6">Online membership registration is not yet available. Submit your interest and we'll contact you.</p>
                {memberDone ? <SuccessNote /> : (
                  <form onSubmit={submitMembership} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Full name *</label><input required value={memberForm.full_name} onChange={(e) => setMemberForm({ ...memberForm, full_name: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Email *</label><input type="email" required value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Country</label><input value={memberForm.country} onChange={(e) => setMemberForm({ ...memberForm, country: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Membership category</label>
                        <select value={memberForm.category} onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value })} className={inputClass}>
                          <option value="">Select a category</option>
                          {MEMBERSHIP_CATEGORIES.map((m) => <option key={m.title} value={m.title}>{m.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div><label className={labelClass}>Message</label><textarea rows={3} value={memberForm.message} onChange={(e) => setMemberForm({ ...memberForm, message: e.target.value })} className={inputClass} /></div>
                    <label className="flex items-start gap-3"><input type="checkbox" checked={memberForm.consent} onChange={(e) => setMemberForm({ ...memberForm, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-input accent-primary" /><ConsentNote /></label>
                    <SubmitButton loading={memberLoading} label="Submit Interest" />
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Volunteer With GYAN" title="Your Skills. Your Time. Your Impact." description="Volunteerism is a fundamental operating principle of GYAN. Bring your time and talent to create lasting change." />
          <div className="mt-12 flex flex-wrap gap-2.5 justify-center">
            {VOLUNTEER_ROLES.map((r) => (
              <span key={r} className="rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium">{r}</span>
            ))}
          </div>
          <div className="mt-14 grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="overflow-hidden rounded-3xl shadow-xl mb-6">
                <img src={IMAGES.volunteers} alt="Youth volunteers collaborating on a community project" className="w-full aspect-[16/10] object-cover" loading="lazy" />
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
                <ShieldCheck className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">Because GYAN works with children and adolescents, all volunteer roles follow our safeguarding, privacy and recruitment procedures.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Become a Volunteer</h3>
                {volDone ? <SuccessNote /> : (
                  <form onSubmit={submitVolunteer} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Full name *</label><input required value={volForm.full_name} onChange={(e) => setVolForm({ ...volForm, full_name: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Email *</label><input type="email" required value={volForm.email} onChange={(e) => setVolForm({ ...volForm, email: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Phone</label><input value={volForm.phone} onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Country</label><input value={volForm.country} onChange={(e) => setVolForm({ ...volForm, country: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div><label className={labelClass}>Area of interest</label>
                      <select value={volForm.area_of_interest} onChange={(e) => setVolForm({ ...volForm, area_of_interest: e.target.value })} className={inputClass}>
                        <option value="">Select an area</option>
                        {VOLUNTEER_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div><label className={labelClass}>Skills</label><input value={volForm.skills} onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })} className={inputClass} placeholder="e.g. communications, research, design" /></div>
                    <div><label className={labelClass}>Short motivation</label><textarea rows={3} value={volForm.motivation} onChange={(e) => setVolForm({ ...volForm, motivation: e.target.value })} className={inputClass} /></div>
                    <div><label className={labelClass}>Availability</label><input value={volForm.availability} onChange={(e) => setVolForm({ ...volForm, availability: e.target.value })} className={inputClass} placeholder="e.g. weekends, 5 hrs/week" /></div>
                    <label className="flex items-start gap-3"><input type="checkbox" checked={volForm.consent} onChange={(e) => setVolForm({ ...volForm, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-input accent-primary" /><ConsentNote /></label>
                    <SubmitButton loading={volLoading} label="Apply to Volunteer" />
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="py-20 lg:py-28 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-gyan">
          <SectionHeading eyebrow="Partnerships" title="Partner With GYAN" description="GYAN seeks constructive partnerships with organizations that share our commitment to youth and adolescent development." />
          <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
            {PARTNER_TYPES.map((p) => (
              <span key={p} className="rounded-full bg-white border border-border px-4 py-2 text-sm font-medium text-foreground/80">{p}</span>
            ))}
          </div>
          <div className="mt-14 grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">GYAN's constitution specifically identifies partnerships and international cooperation as part of our mandate. We do not claim existing partnerships until they are officially confirmed.</p>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold mb-3">What partnerships can achieve</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><Handshake className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Co-designed programmes for young people</li>
                    <li className="flex gap-2"><Handshake className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Shared research, learning and evidence</li>
                    <li className="flex gap-2"><Handshake className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Resource mobilization for greater impact</li>
                    <li className="flex gap-2"><Handshake className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Stronger youth participation and voice</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Partnership Inquiry</h3>
                {partDone ? <SuccessNote /> : (
                  <form onSubmit={submitPartnership} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Organization name *</label><input required value={partForm.organization_name} onChange={(e) => setPartForm({ ...partForm, organization_name: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Contact person *</label><input required value={partForm.contact_person} onChange={(e) => setPartForm({ ...partForm, contact_person: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Email *</label><input type="email" required value={partForm.email} onChange={(e) => setPartForm({ ...partForm, email: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Country</label><input value={partForm.country} onChange={(e) => setPartForm({ ...partForm, country: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Organization type</label><input value={partForm.organization_type} onChange={(e) => setPartForm({ ...partForm, organization_type: e.target.value })} className={inputClass} placeholder="e.g. UN agency, NGO" /></div>
                      <div><label className={labelClass}>Area of interest</label><input value={partForm.area_of_interest} onChange={(e) => setPartForm({ ...partForm, area_of_interest: e.target.value })} className={inputClass} /></div>
                    </div>
                    <div><label className={labelClass}>Partnership proposal</label><textarea rows={3} value={partForm.proposal} onChange={(e) => setPartForm({ ...partForm, proposal: e.target.value })} className={inputClass} /></div>
                    <div><label className={labelClass}>Message</label><textarea rows={3} value={partForm.message} onChange={(e) => setPartForm({ ...partForm, message: e.target.value })} className={inputClass} /></div>
                    <SubmitButton loading={partLoading} label="Send Inquiry" />
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* YOUTH PARTICIPATION */}
      <section id="youth-participation" className="py-20 lg:py-28">
        <div className="container-gyan">
          <SectionHeading eyebrow="Youth Participation" title="Youth Voices. Youth Leadership. Youth Action." description="GYAN promotes the meaningful, safe, inclusive and age-appropriate participation of young people and adolescents." />
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {["Meaningful", "Safe", "Inclusive", "Age-appropriate"].map((tag) => (
              <span key={tag} className="rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold">{tag}</span>
            ))}
          </div>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {YOUTH_PARTICIPATION_MECHANISMS.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05}>
                <div className="flex gap-4 rounded-2xl border border-border bg-white p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}