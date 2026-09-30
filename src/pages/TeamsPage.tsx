import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, ExternalLink, Users } from "lucide-react";
import { IMG } from "../assets";
import { AGE_GROUPS, COMPETITIONS, PLAYMETRICS_SITE, REGISTER_URL } from "../data/club";
import { Btn, Container, MaskReveal, PageHero, Reveal, SectionTitle } from "../components/ui";
import { UnitedOnTheField } from "../components/sections/Results";
import { FinalCTA } from "../components/sections/Community";
import { cn } from "../utils/cn";

type G = "all" | "boys" | "girls";

export default function TeamsPage() {
  const [g, setG] = useState<G>("all");
  const slots = g === "all" ? (["Boys", "Girls"] as const) : g === "boys" ? (["Boys"] as const) : (["Girls"] as const);
  return (
    <>
      <PageHero
        eyebrow="TEAMS"
        title="Find your team"
        lede="Dorchester United fields boys and girls competitive teams across age groups, plus Recreation and Little Ballers. Browse age groups below, then check the club's PlayMetrics site for team and schedule information."
        image={IMG.dribble}
      >
        <Btn href={PLAYMETRICS_SITE} external>
          Team & Schedule Info
        </Btn>
        <Btn href={REGISTER_URL} external variant="ghost">
          Free Evaluation
        </Btn>
      </PageHero>

      {/* Featured team */}
      <section className="on-light bg-white py-20 sm:py-24" aria-labelledby="feat-team">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MaskReveal from="left">
              <img
                src={IMG.hero1686}
                alt="Dorchester United U14 Boys team, Spring 2026"
                loading="lazy"
                className="aspect-[843/532] w-full rounded-3xl object-cover shadow-xl"
              />
            </MaskReveal>
          </div>
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="TEAM SPOTLIGHT" title={<span id="feat-team">U14 Boys · Spring 2026</span>} lede="The photograph that greets you on the club's homepage — one of DUSC's competitive teams for the spring season." />
          </div>
        </Container>
      </section>

      {/* Age groups */}
      <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="age-head">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="2026 – 2027 AGE GROUPS"
              title={<span id="age-head">Boys &amp; girls teams</span>}
              lede="Age groups and birth dates from the club's official programs page. Team names, rosters, coaches and schedules are shown as ready-to-fill placeholders — none are invented here."
            />
            <div role="group" aria-label="Filter by gender" className="inline-flex shrink-0 rounded-full bg-white p-1.5 shadow ring-1 ring-navy-900/10">
              {(["all", "boys", "girls"] as G[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={g === k}
                  onClick={() => setG(k)}
                  className={cn(
                    "rounded-full px-5 py-2 font-display text-xl font-bold tracking-wide uppercase transition-colors",
                    g === k ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-mist"
                  )}
                >
                  {k === "all" ? "All" : k}
                </button>
              ))}
            </div>
          </div>

          <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {AGE_GROUPS.map((a, i) => (
                <motion.li
                  layout
                  key={a.age}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-navy-900/10"
                >
                  <div className="flex items-end justify-between bg-navy-900 p-5 text-white">
                    <div>
                      <p className="font-display text-6xl leading-none font-extrabold">{a.age}</p>
                      <p className="mt-1 text-xs font-bold tracking-widest text-lime uppercase">Competitive · SCYSA leagues</p>
                    </div>
                    <p className="rounded-full bg-white/10 px-3 py-1 font-display text-xl font-bold">{a.format}</p>
                  </div>
                  <dl className="space-y-1.5 p-5 text-[0.95rem]">
                    <div className="flex justify-between gap-3"><dt className="text-ink/60">Born</dt><dd className="text-right font-semibold">{a.range}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-ink/60">Seasons</dt><dd className="font-semibold">{a.seasons}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-ink/60">Club dues</dt><dd className="font-semibold">{a.fee}</dd></div>
                  </dl>
                  <ul className="space-y-2 border-t border-navy-900/10 p-5 pt-4">
                    {slots.map((s) => (
                      <li key={s} className="flex items-center justify-between gap-3 rounded-xl bg-mist px-4 py-3">
                        <span className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
                          <Users aria-hidden className="size-5 text-sky-deep" /> {s}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/55">
                          <CalendarClock aria-hidden className="size-4" /> Team details coming soon
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-900/10">
              <h3 className="font-display text-3xl font-extrabold text-navy-900">Recreation &amp; Little Ballers</h3>
              <p className="mt-2 text-ink/75">
                Local and beginner teams practice and play at the Oakbrook YMCA (2025–2026 program information). See the Programs page for
                birth years and details.
              </p>
              <div className="mt-4"><Btn to="programs" variant="dark">View Programs</Btn></div>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-900/10">
              <h3 className="font-display text-3xl font-extrabold text-navy-900">Schedules &amp; team pages</h3>
              <p className="mt-2 text-ink/75">
                Teams share practice, weather and tournament updates through their Team Reach pages. Program information lives on the
                club's PlayMetrics site.
              </p>
              <div className="mt-4"><Btn href={PLAYMETRICS_SITE} external variant="outline">Open PlayMetrics</Btn></div>
            </div>
          </Reveal>
        </Container>
      </section>

      <UnitedOnTheField />
      <FinalCTA />
    </>
  );
}

export function CompetitionPage() {
  return (
    <>
      <PageHero
        eyebrow="COMPETITION"
        title="Leagues, cups & tournaments"
        lede="DUSC teams compete in SCYSA leagues and state cups and travel to tournaments around the region. Not every team plays in every competition — details depend on program and age group."
        image={IMG.duel}
      >
        <Btn to="teams">Find Your Team</Btn>
      </PageHero>
      <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="comp-title">
        <Container>
          <SectionTitle eyebrow="WHERE WE COMPETE" title={<span id="comp-title">Competitions linked from the club</span>} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPETITIONS.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-900/10"
              >
                <p className="text-xs font-bold tracking-widest text-sky-deep uppercase">{c.who}</p>
                <h3 className="mt-1 font-display text-3xl leading-[1.02] font-extrabold text-navy-900">{c.name}</h3>
                <p className="mt-2 flex-1 text-ink/75">{c.note}</p>
                {c.href && (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-display text-lg font-bold tracking-wide text-sky-deep uppercase">
                    Visit site <ExternalLink aria-hidden className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
          <Reveal className="mt-10 rounded-2xl bg-navy-900 p-7 text-white">
            <h3 className="font-display text-3xl font-extrabold">Fall 2024 preseason travel</h3>
            <p className="mt-2 text-white/80">
              The club's news reported fall tournaments in Myrtle Beach, Augusta, Asheville and Greensboro, and teams competing in three
              different states over three weeks before league play began.
            </p>
          </Reveal>
        </Container>
      </section>
      <UnitedOnTheField showCta={false} />
      <FinalCTA />
    </>
  );
}
