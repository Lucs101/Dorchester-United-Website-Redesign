import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Mail, Pause, Phone, Play } from "lucide-react";
import { IMG, VIDEO } from "../assets";
import { CLUB, REGISTER_URL, SEASON_BANNER } from "../data/club";
import { Btn, Container } from "./ui";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.85, delay: 0.25 + i * 0.22, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(!reduce);
  const [ready, setReady] = useState(false);
  // Smaller file on phones / narrow screens
  const [src] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches ? VIDEO.md : VIDEO.sm
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0px", "-70px"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 text-white">
      {/* Motion layer: youth training footage (stock video) */}
      <motion.div style={{ y: videoY }} className="absolute inset-x-0 -top-10 -bottom-20 -z-30">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-70" : "opacity-0"}`}
          src={src}
          poster={IMG.hero843}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
        />
        {!ready && <img src={IMG.hero843} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/20 lg:via-navy-950/70" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
      <div aria-hidden className="pitch-lines absolute inset-0 -z-10 opacity-70" />

      <Container className="grid items-center gap-10 pt-32 pb-24 lg:grid-cols-12 lg:gap-8 lg:pt-40 lg:pb-24">
        <motion.div style={{ opacity: fade }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-sm font-bold tracking-wide text-lime"
          >
            <span aria-hidden className="size-2 rounded-full bg-lime" />
            {SEASON_BANNER}
          </motion.p>

          <p className="font-display text-[clamp(3.6rem,13vw,7rem)] leading-[0.86] font-extrabold whitespace-nowrap lg:text-[clamp(4.5rem,6.6vw,7rem)]">
            <span className="sr-only">Play Hard. Play Smart. Play United.</span>
            {[
              { t: "Play Hard.", c: "text-white" },
              { t: "Play Smart.", c: "text-sky" },
              { t: "Play United.", c: "text-lime" },
            ].map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.06em]" aria-hidden>
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${l.c}`}>
                  {l.t}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="font-display mt-7 text-3xl font-bold tracking-wide text-white sm:text-4xl"
          >
            Where players grow. Teams unite.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-4 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Dorchester United Soccer Club provides youth players in the Summerville and Ladson, SC area with opportunities to
            learn, compete, develop, and enjoy the beautiful game in a supportive community environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Btn href={REGISTER_URL} external size="lg" className="w-full sm:w-auto">
              Register / Get Started
            </Btn>
            <Btn to="programs" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Programs
            </Btn>
            <Btn to="teams" variant="ghost" size="lg" className="w-full sm:w-auto">
              Find Your Team
            </Btn>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex flex-col gap-2 text-white/85 sm:flex-row sm:gap-8"
          >
            <a href={CLUB.phoneHref} className="flex items-center gap-2 font-semibold hover:text-lime">
              <Phone aria-hidden className="size-4 text-sky" /> {CLUB.phone}
            </a>
            <a href={`mailto:${CLUB.email}`} className="flex items-center gap-2 font-semibold break-all hover:text-lime">
              <Mail aria-hidden className="size-4 text-sky" /> {CLUB.email}
            </a>
          </motion.div>
        </motion.div>

        {/* The actual DUSC photograph */}
        <motion.div style={{ y: cardY }} className="lg:col-span-5">
          <motion.figure
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className="relative"
          >
            <div aria-hidden className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border-2 border-lime/70 sm:-right-5 sm:-bottom-5" />
            <div className="relative overflow-hidden rounded-2xl bg-navy-900 shadow-2xl ring-1 ring-white/20">
              <motion.img
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
                src={IMG.hero1686}
                srcSet={`${IMG.hero843} 843w, ${IMG.hero1686} 1686w`}
                sizes="(min-width:1024px) 42vw, 92vw"
                alt="Dorchester United U14 Boys team, Spring 2026, posing together in DUSC kits"
                width={1686}
                height={1064}
                fetchPriority="high"
                className="block aspect-[843/532] w-full object-cover"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/90 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div>
                  <p className="font-display text-2xl leading-none font-bold tracking-wide">U14 Boys</p>
                  <p className="mt-1 text-sm font-semibold tracking-widest text-lime uppercase">Spring 2026</p>
                </div>
                <img src={IMG.logo256} alt="" aria-hidden className="h-12 w-auto drop-shadow-lg sm:h-14" />
              </figcaption>
            </div>
          </motion.figure>
        </motion.div>
      </Container>

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="absolute right-4 bottom-5 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-navy-950/60 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-navy-950 sm:right-8"
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
        <span className="hidden sm:inline">{playing ? "Pause video" : "Play video"}</span>
      </button>
      <p className="absolute bottom-5 left-5 z-10 hidden text-xs text-white/50 sm:left-8 lg:block">
        Background footage: stock youth-training video (not DUSC players)
      </p>
    </section>
  );
}
