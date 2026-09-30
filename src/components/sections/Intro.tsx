import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { IMG } from "../../assets";
import { REGISTER_URL } from "../../data/club";
import { Btn, Container, Counter, MaskReveal, Reveal } from "../ui";

/* ------------------------------------------------------------------ */
/* Club introduction                                                    */
/* ------------------------------------------------------------------ */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 70]);

  return (
    <section ref={ref} className="on-light relative overflow-hidden bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 font-display text-lg font-bold tracking-[0.18em] text-sky-deep">
              <span aria-hidden className="h-0.5 w-8 bg-sky-deep" />
              WELCOME TO DUSC
            </p>
            <h2 className="font-display text-5xl leading-[0.92] font-extrabold text-navy-900 sm:text-7xl">
              Play Hard.
              <br />
              Play Smart.
              <br />
              <span className="bg-gradient-to-r from-sky-deep to-lime-deep bg-clip-text text-transparent">Play United.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 border-l-4 border-lime pl-5 font-display text-3xl leading-tight font-bold text-navy-800 normal-case sm:text-4xl">
              “We believe that all kids can benefit from playing the Beautiful Game!”
            </blockquote>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              DUSC helps kids reach their full potential by providing access to a competitive environment where{" "}
              <strong>teamwork, effort, and commitment</strong> are the keys to success.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              We are a local non-profit club, committed to removing barriers to access — so that all kids who want to play
              soccer have a home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="about" variant="dark">
                Our Story
              </Btn>
              <Btn href={REGISTER_URL} external variant="outline">
                Free Evaluation
              </Btn>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div style={{ y: y1 }} className="relative ml-auto w-[82%]">
            <MaskReveal from="right">
              <img
                src={IMG.dribble}
                alt="A DUSC player dribbling the ball at speed during a match"
                loading="lazy"
                width={560}
                height={560}
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
              />
            </MaskReveal>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-10 left-0 w-[52%]">
            <MaskReveal from="bottom" delay={0.25}>
              <img
                src={IMG.duel}
                alt="Two players from DUSC and an opponent contesting the ball"
                loading="lazy"
                width={568}
                height={580}
                className="aspect-square w-full rounded-2xl border-[6px] border-white object-cover shadow-2xl"
              />
            </MaskReveal>
          </motion.div>
          <div aria-hidden className="absolute -top-6 left-6 -z-10 size-40 rounded-full bg-lime/30 blur-3xl" />
          <div className="absolute top-4 left-0 rounded-xl bg-navy-900 px-4 py-3 text-white shadow-xl">
            <p className="font-display text-sm font-bold tracking-[0.2em] text-lime">501(c)(3)</p>
            <p className="font-display text-xl leading-tight font-bold">Local, independent non-profit</p>
          </div>
        </div>
      </Container>

      <Container className="mt-24 sm:mt-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-navy-900/10 lg:grid-cols-4">
          {[
            { n: 4, s: "", l: "Programs on one pathway" },
            { n: 5, s: "", l: "Development phases, U5 – U19" },
            { n: 11, s: "", l: "Competitive age groups, U8 – U18" },
            { n: 2, s: "", l: "Home fields in Ladson & Summerville" },
          ].map((s) => (
            <div key={s.l} className="bg-mist px-5 py-7 text-center sm:py-9">
              <dd className="font-display text-6xl font-extrabold text-navy-900 sm:text-7xl">
                <Counter to={s.n} suffix={s.s} />
              </dd>
              <dt className="mt-1 text-sm font-semibold tracking-wide text-ink/70 uppercase">{s.l}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Signature scroll moment: PLAY HARD → SMART → UNITED → locked phrase  */
/* ------------------------------------------------------------------ */
const SCENES = [IMG.hero1686, IMG.dribble, IMG.duel, IMG.hero1686, IMG.hero1686];
const CAPTIONS = ["U14 Boys · Spring 2026", "DUSC in action", "DUSC in action", "U14 Boys · Spring 2026", "U14 Boys · Spring 2026"];

export function SignatureScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = v < 0.2 ? 0 : v < 0.4 ? 1 : v < 0.6 ? 2 : v < 0.78 ? 3 : 4;
    setPhase((cur) => (cur === p ? cur : p));
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const word = (t: string, color: string) => (
    <motion.h2
      key={t}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -50, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`font-display text-[clamp(4.5rem,17vw,12rem)] leading-[0.85] font-extrabold ${color}`}
    >
      {t}
    </motion.h2>
  );

  return (
    <div ref={ref} className="relative h-[480vh] bg-navy-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden text-white">
        {/* blurred backdrop follows current scene */}
        <AnimatePresence mode="sync">
          <motion.img
            key={phase + "bg"}
            src={SCENES[phase]}
            alt=""
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
        </AnimatePresence>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-950/70 to-navy-800/60" />
        <div aria-hidden className="pitch-lines absolute inset-0 opacity-60" />

        <Container className="relative grid h-full items-center gap-6 py-24 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="relative min-h-[11rem] sm:min-h-[15rem] lg:min-h-[22rem]">
              <AnimatePresence mode="wait">
                {phase === 0 && word("Play Hard.", "text-white")}
                {phase === 1 && word("Play Smart.", "text-sky")}
                {phase === 2 && word("Play United.", "text-lime")}
                {phase === 3 && (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.88] font-extrabold"
                  >
                    <span className="block text-white">Play Hard.</span>
                    <span className="block text-sky">Play Smart.</span>
                    <span className="block text-lime">Play United.</span>
                  </motion.div>
                )}
                {phase === 4 && (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.92] font-extrabold">
                      All kids deserve
                      <br />a <span className="text-lime">place to play.</span>
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                      DUSC is a local non-profit club, committed to removing barriers to access, so that all kids who want to
                      play soccer have a home.
                    </p>
                    <div className="mt-6">
                      <Btn href={REGISTER_URL} external size="lg">
                        Register Now
                      </Btn>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="sr-only">Play Hard. Play Smart. Play United. All kids deserve a place to play.</p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-white/25 sm:max-w-xl lg:aspect-[4/5] lg:max-w-none">
              <AnimatePresence mode="sync">
                <motion.img
                  key={phase + "fg"}
                  src={SCENES[phase]}
                  alt={
                    phase === 1
                      ? "A DUSC player dribbling the ball"
                      : phase === 2
                        ? "DUSC players contesting the ball"
                        : "Dorchester United U14 Boys team, Spring 2026"
                  }
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: phase === 0 || phase >= 3 ? "50% 40%" : "50% 50%" }}
                />
              </AnimatePresence>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-950/85 to-transparent" />
              <p className="absolute bottom-3 left-4 font-display text-lg font-bold tracking-widest text-white/90">{CAPTIONS[phase]}</p>
            </div>
          </div>
        </Container>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div style={{ width: bar }} className="h-full bg-lime" />
        </div>
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/50 uppercase">
          {phase < 4 ? "Keep scrolling" : ""}
        </p>
      </div>
    </div>
  );
}
