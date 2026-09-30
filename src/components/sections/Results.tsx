import { motion } from "framer-motion";
import { Medal, Trophy } from "lucide-react";
import { HISTORY } from "../../data/club";
import { Btn, Container, SectionTitle } from "../ui";

/* UNITED ON THE FIELD — verified results & milestones only */
export function UnitedOnTheField({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28" aria-labelledby="otf-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            dark
            eyebrow="RESULTS & MILESTONES"
            title={<span id="otf-title">United on the field</span>}
            lede="Verified highlights from the club's own news and history pages — swipe or scroll through the story so far."
          />
          {showCta && (
            <div className="flex gap-3">
              <Btn to="competition" variant="ghost">
                Competition
              </Btn>
              <Btn to="news" variant="secondary">
                View News
              </Btn>
            </div>
          )}
        </div>
      </Container>

      <div className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {HISTORY.map((h, i) => {
          const hot = i === 0;
          return (
            <motion.article
              key={h.title}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative flex w-[82vw] max-w-md shrink-0 snap-start flex-col rounded-2xl p-6 sm:w-96 sm:p-7 ${
                hot ? "bg-lime text-navy-950" : "bg-white/[0.06] ring-1 ring-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                    hot ? "bg-navy-950 text-lime" : "bg-sky/20 text-sky"
                  }`}
                >
                  {h.tag}
                </span>
                {h.tag === "Results" ? (
                  <Trophy aria-hidden className={`size-7 ${hot ? "text-navy-950" : "text-lime"}`} />
                ) : (
                  <Medal aria-hidden className={`size-7 ${hot ? "text-navy-950" : "text-white/40"}`} />
                )}
              </div>
              <p className={`mt-6 font-display text-lg font-bold tracking-[0.15em] ${hot ? "text-navy-950/70" : "text-lime"}`}>{h.when}</p>
              <h3 className="mt-1 font-display text-3xl leading-[1.02] font-extrabold sm:text-4xl">{h.title}</h3>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${hot ? "text-navy-950/85" : "text-white/75"}`}>{h.text}</p>
            </motion.article>
          );
        })}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
      <Container>
        <p className="mt-2 text-xs text-white/45">
          Source: dorchesterunited.com (History and News). Not every team competes in every league or tournament.
        </p>
      </Container>
    </section>
  );
}
