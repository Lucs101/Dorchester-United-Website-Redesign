import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeartHandshake, Wallet, Users, ArrowUpRight } from "lucide-react";
import { IMG } from "../../assets";
import { CLUB, PARTNERS, REGISTER_URL, PLAYMETRICS_SITE } from "../../data/club";
import { cn } from "../../utils/cn";
import { FacebookIcon, InstagramIcon } from "../icons";
import { Btn, Container, MaskReveal, Reveal, SectionTitle } from "../ui";

/* ------------------------------------------------------------------ */
/* Registration steps                                                   */
/* ------------------------------------------------------------------ */
export const STEPS = [
  { t: "Find the right program", d: "Little Ballers, Recreation, Junior Academy or Academy — see where your player fits on the pathway." },
  { t: "Review eligibility", d: "Age groups are changing from birth-year to school-year brackets for 2026–2027. Ask the club if you're unsure." },
  { t: "Pre-register online", d: "Pre-registration is required and is handled through the club's registration platform, PlayMetrics." },
  { t: "Attend a free evaluation", d: "Junior Academy and Academy require selection. All evaluations are always free." },
  { t: "Get team & program information", d: "Teams share updates through their Team Reach pages; program details live on the club's PlayMetrics site." },
];

export function RegistrationSteps({ dark = true }: { dark?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {STEPS.map((s, i) => (
        <motion.li
          key={s.t}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className={cn(
            "relative rounded-2xl p-5",
            dark ? "bg-navy-950/80 text-white ring-1 ring-white/10" : "bg-white text-ink shadow-md ring-1 ring-navy-900/10"
          )}
        >
          <span className={cn("font-display text-6xl leading-none font-extrabold", dark ? "text-lime" : "text-sky")}>{i + 1}</span>
          <h3 className={cn("mt-2 font-display text-2xl leading-tight font-bold", dark ? "text-white" : "text-navy-900")}>{s.t}</h3>
          <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/70" : "text-ink/70")}>{s.d}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function RegistrationBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-deep via-navy-800 to-navy-950 py-20 text-white sm:py-24" aria-labelledby="reg-title">
      <div aria-hidden className="pitch-lines absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -bottom-32 -left-20 size-96 rounded-full bg-lime/20 blur-3xl" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            dark
            eyebrow="REGISTRATION"
            title={<span id="reg-title">Registration for 2026–2027 is open</span>}
            lede="Register for a free evaluation — five simple steps from first click to first practice."
          />
          <Reveal className="flex flex-col gap-3 sm:flex-row">
            <Btn href={REGISTER_URL} external size="lg">
              Register Now
            </Btn>
            <Btn to="registration" variant="ghost" size="lg">
              How It Works
            </Btn>
          </Reveal>
        </div>
        <div className="mt-12">
          <RegistrationSteps />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Community + partners                                                 */
/* ------------------------------------------------------------------ */
export function Community() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32" aria-labelledby="community-title">
      <motion.img
        style={{ y }}
        src={IMG.hero1686}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute -inset-y-[10%] inset-x-0 -z-20 h-[120%] w-full object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/50" />
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionTitle
            dark
            eyebrow="COMMUNITY"
            title={<span id="community-title">A home for everyone who wants to play</span>}
            lede="Dorchester United is a local, independent 501(c)(3) non-profit youth soccer club. Our purpose is to make the Beautiful Game available to every kid that wants to play."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Our mission is to reduce barriers to access by partnering with local individuals and businesses to reduce — and / or
              eliminate — fees to play. In order to keep our prices low and offer financial aid, we need your help. A variety of
              partnership levels are available at any price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={`mailto:${CLUB.programEmail}?subject=Partnering%20with%20DUSC`} variant="primary">
                Become a Partner
              </Btn>
              <Btn to="about" variant="ghost">
                About DUSC
              </Btn>
            </div>
          </Reveal>
        </div>
        <ul className="grid gap-4 lg:col-span-5">
          {[
            { i: Wallet, t: "Need-based financial aid", d: "Available for families who need it." },
            { i: HeartHandshake, t: "Payment plans", d: "Available for club dues." },
            { i: Users, t: "Everyone is welcome here", d: "Inclusivity is our first core value." },
          ].map((c, n) => (
            <motion.li
              key={c.t}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * n, duration: 0.6 }}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10 backdrop-blur"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-lime text-navy-950">
                <c.i aria-hidden className="size-7" />
              </span>
              <div>
                <h3 className="font-display text-2xl leading-none font-bold">{c.t}</h3>
                <p className="mt-1 text-white/70">{c.d}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Partners({ title = "Community partners" }: { title?: string }) {
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section className="on-light border-y border-navy-900/10 bg-white py-14" aria-labelledby="partners-title">
      <Container>
        <h2 id="partners-title" className="text-center font-display text-2xl font-bold tracking-[0.2em] text-navy-900/70 uppercase">
          {title}
        </h2>
      </Container>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="animate-marquee flex w-max items-center gap-6 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {items.map((p, i) => (
            <li key={p.key + i} aria-hidden={i >= PARTNERS.length ? true : undefined}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={i >= PARTNERS.length ? -1 : undefined}
                className="flex h-28 w-56 items-center justify-center rounded-2xl bg-white p-3 shadow ring-1 ring-navy-900/10 transition hover:-translate-y-1 hover:shadow-xl sm:h-32 sm:w-64"
              >
                <img src={IMG.partners[p.key]} alt={`${p.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery + Follow United                                              */
/* ------------------------------------------------------------------ */
const GALLERY = [
  { src: IMG.hero1686, alt: "DUSC U14 Boys, Spring 2026", cap: "U14 Boys · Spring 2026", real: true, w: "sm:w-[34rem]" },
  { src: IMG.dribble, alt: "A DUSC player dribbling during a match", cap: "DUSC player in action", real: true, w: "sm:w-80" },
  { src: IMG.duel, alt: "DUSC players contesting the ball", cap: "DUSC players in action", real: true, w: "sm:w-80" },
  { src: IMG.stock.warmup, alt: "Children warming up with their coach on a soccer field", cap: "Stock photo · illustrative", real: false, w: "sm:w-[28rem]" },
  { src: IMG.stock.match, alt: "Boys playing soccer on an outdoor field", cap: "Stock photo · illustrative", real: false, w: "sm:w-[28rem]" },
  { src: IMG.stock.sunny, alt: "Two kids playing soccer on a sunny day", cap: "Stock photo · illustrative", real: false, w: "sm:w-[28rem]" },
];

export function Gallery() {
  return (
    <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="gallery-title">
      <Container>
        <SectionTitle
          eyebrow="PHOTOS"
          title={<span id="gallery-title">Life at United</span>}
          lede="Real DUSC photos first. Where the club's own photography isn't available yet, clearly labeled stock images fill in."
        />
      </Container>
      <div className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {GALLERY.map((g, i) => (
          <MaskReveal key={g.cap + i} from="right" delay={Math.min(i, 3) * 0.08} className={cn("w-[82vw] shrink-0 snap-start", g.w)}>
            <figure className="group relative h-72 overflow-hidden rounded-2xl sm:h-[26rem]">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption
                className={cn(
                  "absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase",
                  g.real ? "bg-lime text-navy-950" : "bg-navy-950/80 text-white"
                )}
              >
                {g.cap}
              </figcaption>
            </figure>
          </MaskReveal>
        ))}
      </div>
    </section>
  );
}

export function FollowUnited({ dark = false }: { dark?: boolean }) {
  const cards = [
    { icon: InstagramIcon, name: "Instagram", handle: CLUB.instagramHandle, href: CLUB.instagram },
    { icon: FacebookIcon, name: "Facebook", handle: "Dorchester United Soccer Club", href: CLUB.facebook },
  ];
  return (
    <section className={cn("py-16 sm:py-20", dark ? "bg-navy-900 text-white" : "on-light bg-white")} aria-labelledby="follow-title">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle
              dark={dark}
              eyebrow="SOCIAL"
              title={<span id="follow-title">Follow United</span>}
              lede="Game-day photos, updates and announcements from across the club live on our social channels."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {cards.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 p-6 text-white shadow-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-lime text-navy-950">
                    <c.icon className="size-7" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-3xl leading-none font-extrabold">{c.name}</span>
                    <span className="mt-1 block truncate text-white/70">{c.handle}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-6 text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-center text-white sm:py-32" aria-labelledby="final-title">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,160,224,.35),transparent_65%)]" />
      <div aria-hidden className="pitch-lines absolute inset-0 -z-10 opacity-70" />
      <Container>
        <Reveal>
          <img src={IMG.logo256} alt="" aria-hidden className="mx-auto h-24 w-auto sm:h-28" />
          <h2 id="final-title" className="mx-auto mt-6 max-w-4xl font-display text-6xl leading-[0.9] font-extrabold sm:text-8xl">
            Ready to play <span className="text-lime">united?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-white/80">
            Registration for the 2026–2027 soccer year is open. Register for a free evaluation or reach out — we'd love to help you
            find a home on the pitch.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Btn href={REGISTER_URL} external size="lg">
              Register for a Free Evaluation
            </Btn>
            <Btn to="contact" variant="ghost" size="lg">
              Contact the Club
            </Btn>
          </div>
          <p className="mt-6 text-sm text-white/55">
            Or explore the club's{" "}
            <a className="underline hover:text-lime" href={PLAYMETRICS_SITE} target="_blank" rel="noopener noreferrer">
              PlayMetrics site
            </a>{" "}
            for team and program information.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
