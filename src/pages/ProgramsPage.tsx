import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { IMG } from "../assets";
import { AGE_GROUPS, CLUB, INCLUDED, PLAYMETRICS_SITE, PROGRAMS, REGISTER_URL } from "../data/club";
import { Btn, Container, PageHero, Reveal, SectionTitle } from "../components/ui";
import { CoachingSection, Pathway } from "../components/sections/Programs";
import { FinalCTA, RegistrationSteps } from "../components/sections/Community";

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROGRAMS"
        title="One club. A path for every player."
        lede="From Little Ballers to Academy, Dorchester United offers a pathway for boys and girls from ages 4 to 18 — from beginner to advanced, from part-timer to fully committed."
        image={IMG.stock.warmup}
      >
        <Btn href={REGISTER_URL} external>
          Register for a Free Evaluation
        </Btn>
      </PageHero>

      {/* Sticky program quick-nav */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-navy-900/95 backdrop-blur">
        <Container className="flex items-center gap-2 overflow-x-auto py-3 hide-scrollbar">
          <span className="hidden shrink-0 font-display text-sm font-bold tracking-[0.2em] text-lime sm:block">JUMP TO</span>
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => jump(p.id)}
              className="shrink-0 rounded-full border border-white/25 px-4 py-1.5 font-display text-lg font-semibold tracking-wide text-white uppercase transition hover:border-lime hover:text-lime"
            >
              {p.step}. {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => jump("age-groups")}
            className="shrink-0 rounded-full border border-white/25 px-4 py-1.5 font-display text-lg font-semibold tracking-wide text-white uppercase transition hover:border-lime hover:text-lime"
          >
            2026–27 Fees
          </button>
        </Container>
      </div>

      <Pathway />

      {/* 2026–2027 competitive teams — official program page */}
      <section id="age-groups" className="on-light bg-white py-20 sm:py-28" aria-labelledby="age-title">
        <Container>
          <SectionTitle
            eyebrow="2026 – 2027 COMPETITIVE TEAMS"
            title={<span id="age-title">Boys &amp; girls competitive teams</span>}
            lede="All teams play in SCYSA Leagues. Age groups, birth dates and dues below are as published on the club's official programs page."
          />
          <div className="mt-10 overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy-900/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">2026–2027 competitive age groups, birth dates, dues, seasons and game format</caption>
                <thead className="bg-navy-900 text-white">
                  <tr className="font-display text-lg tracking-wider uppercase">
                    <th scope="col" className="px-5 py-4">Age group</th>
                    <th scope="col" className="px-5 py-4">Birth dates</th>
                    <th scope="col" className="px-5 py-4">Club dues</th>
                    <th scope="col" className="px-5 py-4">Seasons included</th>
                    <th scope="col" className="px-5 py-4">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {AGE_GROUPS.map((a, i) => (
                    <motion.tr
                      key={a.age}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: (i % 6) * 0.04 }}
                      className={i % 2 ? "bg-mist" : "bg-white"}
                    >
                      <th scope="row" className="px-5 py-3 font-display text-3xl font-extrabold text-navy-900">{a.age}</th>
                      <td className="px-5 py-3 text-ink/80">{a.range}</td>
                      <td className="px-5 py-3 font-display text-2xl font-bold text-navy-900">{a.fee}</td>
                      <td className="px-5 py-3 text-ink/80">{a.seasons}</td>
                      <td className="px-5 py-3 font-semibold text-sky-deep">{a.format}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 flex gap-2 text-sm text-ink/60">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            Fees copied from dorchesterunited.org. The club is moving to school-year age brackets for 2026–2027 — please confirm
            placement and current dues with the club before registering.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-4xl font-extrabold text-navy-900">What's included</h3>
              <ul className="mt-5 space-y-3">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex gap-3 text-lg text-ink/85">
                    <Check aria-hidden className="mt-1 size-5 shrink-0 text-lime-deep" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-navy-900 p-8 text-white">
                <h3 className="font-display text-4xl font-extrabold">Questions about a program?</h3>
                <p className="mt-3 text-white/75">
                  Email the club at <a className="font-bold text-lime underline break-all" href={`mailto:${CLUB.programEmail}`}>{CLUB.programEmail}</a>, call{" "}
                  <a className="font-bold text-lime" href={CLUB.phoneHref}>{CLUB.phone}</a>, or browse program information on the club's PlayMetrics site.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Btn href={REGISTER_URL} external>Register Now</Btn>
                  <Btn href={PLAYMETRICS_SITE} external variant="ghost">PlayMetrics Site</Btn>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <CoachingSection />
      <FinalCTA />
    </>
  );
}

export function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="REGISTRATION"
        title="Registration for 2026–2027 is open"
        lede="Registration and evaluations are handled through the club's online registration platform. Register for a free evaluation to get started."
        image={IMG.hero1686}
      >
        <Btn href={REGISTER_URL} external size="lg">
          Register Now
        </Btn>
        <Btn href={PLAYMETRICS_SITE} external variant="ghost" size="lg">
          PlayMetrics Site
        </Btn>
      </PageHero>

      <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="how-title">
        <Container>
          <SectionTitle eyebrow="HOW IT WORKS" title={<span id="how-title">From first click to first practice</span>} />
          <div className="mt-12">
            <RegistrationSteps dark={false} />
          </div>
          <Reveal className="mt-12 rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-display text-4xl font-extrabold sm:text-5xl">Register for a free evaluation</h3>
                <p className="mt-2 max-w-2xl text-white/75">
                  You'll be taken to the club's official PlayMetrics registration page. No fees are collected on this website.
                </p>
              </div>
              <Btn href={REGISTER_URL} external size="lg">Register Now</Btn>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="on-light bg-white py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="GOOD TO KNOW" title="Affordable by design" />
            <ul className="mt-6 space-y-3">
              {INCLUDED.slice(0, 6).map((t) => (
                <li key={t} className="flex gap-3 text-lg text-ink/85">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-lime-deep" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-mist p-8 ring-1 ring-navy-900/10">
              <h3 className="font-display text-4xl font-extrabold text-navy-900">Need help deciding?</h3>
              <p className="mt-3 text-lg text-ink/80">
                Not sure which program or age group fits your player? The club can help you navigate the 2026–2027 move from birth-year
                to school-year age brackets — just reach out.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn to="programs" variant="dark">View Programs</Btn>
                <Btn to="contact" variant="outline">Contact the Club</Btn>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
