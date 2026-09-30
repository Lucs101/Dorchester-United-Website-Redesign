import { motion } from "framer-motion";
import { IMG } from "../assets";
import { CLUB, CORE_VALUES, HISTORY, REGISTER_URL } from "../data/club";
import { Btn, Container, MaskReveal, PageHero, Reveal, SectionTitle } from "../components/ui";
import { CoachingSection, PlayerDevelopment } from "../components/sections/Programs";
import { Community, FinalCTA, Partners } from "../components/sections/Community";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="A local club with a big heart"
        lede="Dorchester United Soccer Club is a local, independent 501(c)(3) non-profit youth soccer club. Our purpose is to make the Beautiful Game of soccer available to every kid that wants to play."
        image={IMG.hero1686}
      >
        <Btn href={REGISTER_URL} external>
          Register Now
        </Btn>
        <Btn to="programs" variant="ghost">
          Explore Programs
        </Btn>
      </PageHero>

      {/* Mission & vision */}
      <section className="on-light bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="MISSION" title="Affordable, competitive, welcoming" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                The mission of Dorchester United Soccer Club is to provide an affordable and competitive club soccer option for all
                the kids in our community. We believe that all kids can benefit from playing soccer, and it is our mission to provide
                a welcoming, safe, inclusive, fun, and competitive environment that supports kids reaching their full potential, on
                and off the field.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">
                We reduce barriers to access by partnering with local individuals and businesses to reduce — and / or eliminate — fees
                to play.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <MaskReveal from="right">
              <div className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
                <p className="font-display text-lg font-bold tracking-[0.2em] text-lime">OUR VISION</p>
                <p className="mt-3 font-display text-3xl leading-tight font-bold normal-case sm:text-4xl">
                  A safe learning environment where kids can have fun and learn the values of teamwork, effort, ambition, and
                  commitment.
                </p>
                <p className="mt-5 text-white/75">
                  Our vision includes a plan that incorporates the age-appropriate physical, cognitive, social, emotional, and
                  developmental needs of our players and recognizes that each player is an individual. We believe in — and operate in
                  — a <strong className="text-white">Player Centered Environment</strong>.
                </p>
              </div>
            </MaskReveal>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="values-title">
        <Container>
          <SectionTitle eyebrow="CORE VALUES" title={<span id="values-title">What we stand for</span>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((v, i) => (
              <motion.li
                key={v.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-900/10"
              >
                <span className="font-display text-5xl leading-none font-extrabold text-sky/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-3xl leading-[1.02] font-extrabold text-navy-900">{v.name}</h3>
                <p className="mt-2 text-ink/70">{v.text}</p>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      <PlayerDevelopment />
      <CoachingSection />

      {/* History */}
      <section className="on-light bg-white py-20 sm:py-28" aria-labelledby="history-title">
        <Container>
          <SectionTitle eyebrow="OUR HISTORY" title={<span id="history-title">Since April 2019</span>} lede="From two coaches at the Oakbrook Y to a club with an Academy, a Junior Academy, Recreation and Little Ballers." />
          <ol className="relative mt-14 space-y-8 border-l-2 border-navy-900/15 pl-8 sm:pl-12">
            {HISTORY.slice()
              .reverse()
              .map((h) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <span aria-hidden className="absolute top-2 -left-[2.65rem] size-4 rounded-full bg-lime ring-4 ring-white sm:-left-[3.65rem]" />
                  <p className="font-display text-xl font-bold tracking-[0.15em] text-sky-deep">{h.when}</p>
                  <h3 className="font-display text-3xl font-extrabold text-navy-900">{h.title}</h3>
                  <p className="mt-1 max-w-3xl text-ink/75">{h.text}</p>
                </motion.li>
              ))}
          </ol>
          <p className="mt-10 text-sm text-ink/55">Source: dorchesterunited.com — History, Mission, Vision.</p>
        </Container>
      </section>

      <Community />
      <Partners />
      <section className="on-light bg-mist py-14 text-center">
        <Container>
          <p className="text-lg text-ink/75">
            Questions about the club? Call <a className="font-bold text-sky-deep" href={CLUB.phoneHref}>{CLUB.phone}</a> or email{" "}
            <a className="font-bold text-sky-deep break-all" href={`mailto:${CLUB.email}`}>{CLUB.email}</a>.
          </p>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
