import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Baby, Flag, GraduationCap, Sprout, Trophy } from "lucide-react";
import { IMG } from "../../assets";
import { DEV_THEMES, PHASES, PROGRAMS, REGISTER_URL, type Program } from "../../data/club";
import { cn } from "../../utils/cn";
import { Btn, Container, Reveal, SectionTitle } from "../ui";

const ICONS = [Baby, Sprout, Flag, Trophy];

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold tracking-[0.16em] text-lime uppercase">{label}</dt>
      <dd className="mt-0.5 text-[0.95rem] leading-snug text-white/90">{value}</dd>
    </div>
  );
}

function PathCard({ p, i, compact }: { p: Program; i: number; compact?: boolean }) {
  const Icon = ICONS[i];
  const right = i % 2 === 1;
  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-16" id={p.id}>
      {/* node on the line */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        className="absolute top-8 left-6 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-lime font-display text-2xl font-extrabold text-navy-950 shadow-[0_0_0_6px_rgba(43,224,0,.2)] md:left-1/2"
        aria-hidden
      >
        {p.step}
      </motion.div>

      <motion.article
        initial={{ opacity: 0, x: right ? 70 : -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "ml-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur sm:p-8 md:ml-0",
          right && "md:col-start-2"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-sky uppercase">{p.tag}</p>
            <h3 className="font-display text-4xl leading-none font-extrabold text-white sm:text-5xl">{p.name}</h3>
          </div>
          <Icon aria-hidden className="size-10 shrink-0 text-white/30" />
        </div>
        <p className="mt-4 text-base leading-relaxed text-white/80">{p.blurb}</p>
        <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-2">
          <Fact label="Birth years (2025–26)" value={p.birth} />
          <Fact label="Skill level" value={p.level} />
          <Fact label="Competitive level" value={p.competitive} />
          <Fact label="Where" value={p.where} />
          <Fact label="Selection" value={p.selection} />
          {!compact && <Fact label="Season" value={p.season} />}
        </dl>
        {!compact && (
          <ul className="mt-5 space-y-1.5 text-sm text-white/70">
            {p.extras.map((e) => (
              <li key={e} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                {e}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Btn href={REGISTER_URL} external>
            {p.selection.includes("Selection required") ? "Free Evaluation" : "Register Now"}
          </Btn>
          {compact && (
            <Btn to="programs" variant="ghost">
              Program Details
            </Btn>
          )}
        </div>
      </motion.article>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Player Development Pathway (programs)                                */
/* ------------------------------------------------------------------ */
export function Pathway({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28" aria-labelledby="pathway-title">
      <div aria-hidden className="pitch-lines absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-sky/20 blur-3xl" />
      <Container className="relative">
        <SectionTitle
          dark
          eyebrow="PLAYER DEVELOPMENT PATHWAY"
          title={<span id="pathway-title">Find where your player fits</span>}
          lede="From a first touch on the ball to competitive travel soccer — four programs, one club. Start at the beginning or join at the level that suits your player."
        />
        <p className="mt-4 max-w-3xl text-sm text-white/60">
          Program details shown are from the club's 2025–2026 program pages. For 2026–2027 the club is moving from birth-year to
          school-year age brackets — confirm your player's placement with the club.
        </p>

        <ol ref={ref} className="relative mt-14 space-y-10 md:space-y-14">
          <span aria-hidden className="absolute top-0 bottom-0 left-6 w-0.5 bg-white/15 md:left-1/2 md:-translate-x-1/2" />
          <motion.span
            aria-hidden
            style={{ height: h }}
            className="absolute top-0 left-6 w-0.5 bg-gradient-to-b from-sky to-lime md:left-1/2 md:-translate-x-1/2"
          />
          {PROGRAMS.map((p, i) => (
            <PathCard key={p.id} p={p} i={i} compact={compact} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Player development philosophy — animated theme sequence              */
/* ------------------------------------------------------------------ */
export function PlayerDevelopment({ showPhases = true }: { showPhases?: boolean }) {
  return (
    <section className="on-light relative overflow-hidden bg-mist py-20 sm:py-28" aria-labelledby="dev-title">
      <Container>
        <SectionTitle
          eyebrow="PLAYER DEVELOPMENT"
          title={<span id="dev-title">Built on teamwork, effort &amp; commitment</span>}
          lede="Our vision is a safe learning environment where kids have fun and learn the values of teamwork, effort, ambition, and commitment — in a Player Centered Environment."
        />

        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="absolute top-7 right-[8%] left-[8%] hidden h-1 rounded bg-gradient-to-r from-sky to-lime lg:block"
          />
          {DEV_THEMES.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.22, duration: 0.6 }}
              className="relative flex gap-4 lg:flex-col lg:items-center lg:px-3 lg:text-center"
            >
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-2xl font-extrabold text-lime ring-4 ring-mist">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-3xl leading-none font-extrabold text-navy-900 lg:mt-3">{t.name}</h3>
                <p className="mt-1.5 text-sm leading-snug text-ink/70">{t.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {showPhases && (
          <div className="mt-24">
            <Reveal>
              <h3 className="font-display text-4xl font-extrabold text-navy-900 sm:text-5xl">
                Five phases, ages 4 to 18
              </h3>
              <p className="mt-3 max-w-3xl text-lg text-ink/75">
                We have a pathway for boys and girls from ages 4 to 18 — from beginner to advanced, from part-timer to fully
                committed — with a simple playing style, clear progressions, a focus on performances over results, and players who
                are free to make decisions and express themselves creatively.
              </p>
            </Reveal>
            <div className="hide-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
              {PHASES.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="w-[78vw] max-w-sm shrink-0 snap-start rounded-2xl bg-white p-6 shadow-lg ring-1 ring-navy-900/5 sm:w-80"
                >
                  <p className="font-display text-lg font-bold tracking-[0.15em] text-sky-deep">{p.ages}</p>
                  <h4 className="font-display text-4xl leading-none font-extrabold text-navy-900">{p.name} Phase</h4>
                  <p className="mt-3 font-semibold text-navy-800">{p.goal}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    <span className="font-bold">Tactical plan:</span> {p.plan}
                  </p>
                  <div aria-hidden className="mt-5 h-1.5 overflow-hidden rounded-full bg-navy-900/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((i + 1) / PHASES.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky to-lime"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export function CoachingSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28" aria-labelledby="coach-title">
      <div aria-hidden className="pitch-lines absolute inset-0 opacity-50" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle
            dark
            eyebrow="COACHING & DEVELOPMENT"
            title={<span id="coach-title">Licensed coaches. Player-centered.</span>}
            lede="Teams in the Academy and Junior Academy — and every program listed on the club's program pages — are coached by US Soccer Licensed Coaches."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {[
                "Technical skills taught through a simple playing style with clear progressions",
                "Focus on performances over results",
                "Players are allowed to make decisions and express themselves creatively",
                "Age-appropriate physical, cognitive, social, emotional and developmental needs — every player is an individual",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-lg text-white/85">
                  <GraduationCap aria-hidden className="mt-1 size-5 shrink-0 text-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <figure className="relative">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
              <img
                src={IMG.stock.coach}
                alt="A youth soccer coach giving guidance to a young goalkeeper (stock photo)"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-white/50">Illustrative stock photo — not a DUSC coach or player.</figcaption>
            <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-xl bg-lime px-5 py-4 text-navy-950 shadow-xl sm:left-auto sm:-right-4">
              <p className="font-display text-3xl leading-none font-extrabold">US Soccer Licensed Coaches</p>
              <p className="mt-1 text-sm font-semibold">Coach biographies to be published by the club.</p>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
