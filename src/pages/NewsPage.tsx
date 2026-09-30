import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMG } from "../assets";
import { CLUB, FIELDS } from "../data/club";
import { NEWS, type NewsItem } from "../data/club";
import { Container, PageHero, Reveal, SectionTitle } from "../components/ui";
import { FeaturedStory, NewsCard, NewsModal } from "../components/sections/News";
import { FieldCard, FieldStatus } from "../components/sections/Fields";
import { FinalCTA, FollowUnited } from "../components/sections/Community";
import { cn } from "../utils/cn";

const CATS = ["All", ...Array.from(new Set(NEWS.map((n) => n.category)))] as const;

export default function NewsPage() {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<NewsItem | null>(null);
  const [feat, ...rest] = NEWS;
  const list = useMemo(() => (cat === "All" ? rest : NEWS.filter((n) => n.category === cat)), [cat, rest]);

  return (
    <>
      <PageHero
        eyebrow="NEWS"
        title="Latest from United"
        lede="Club announcements, registration updates, results and events — with every story clearly dated so older posts never pass as current."
        image={IMG.hero1686}
      />
      <section className="on-light bg-white py-16 sm:py-24">
        <Container>
          {cat === "All" && <FeaturedStory n={feat} onOpen={setOpen} />}
          <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter news by category">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-lg font-bold tracking-wide uppercase transition-colors",
                  cat === c ? "bg-navy-900 text-white" : "bg-mist text-navy-900 hover:bg-sky/20"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((n, i) => (
                <motion.div key={n.id} layout exit={{ opacity: 0, scale: 0.95 }}>
                  <NewsCard n={n} index={i} onOpen={setOpen} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-10 rounded-2xl bg-mist p-5 text-sm text-ink/65">
            <strong>For club administrators:</strong> stories are managed in one simple list (<code>src/data/club.ts → NEWS</code>). Add an
            entry with a date, category, summary and body and it appears here, on the homepage and in the archive flags automatically.
            Older articles were imported from the original club site and are marked <em>Archive</em>.
          </p>
        </Container>
      </section>
      <FollowUnited />
      <FinalCTA />
      <NewsModal n={open} onClose={() => setOpen(null)} />
    </>
  );
}

export function FieldsPage() {
  return (
    <>
      <PageHero
        eyebrow="FIELDS & LOCATIONS"
        title="Where we play"
        lede="Dorchester United trains and plays at two locations in the Summerville / Ladson area. Tap Get Directions for turn-by-turn navigation."
        image={IMG.stock.match}
      />
      <section className="on-light bg-mist py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {FIELDS.map((f, i) => (
              <FieldCard key={f.id} f={f} i={i} />
            ))}
          </div>
          <Reveal className="mt-10">
            <FieldStatus />
          </Reveal>
        </Container>
      </section>
      <section className="on-light bg-white py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="GOOD TO KNOW" title="Before you head out" />
            <ul className="mt-6 space-y-3 text-lg text-ink/80">
              <li>Check your team's Team Reach page for practice, weather and cancellation updates.</li>
              <li>Tom Conley Park is where the club holds its town-hall meetings (1050 Discovery Drive, Ladson).</li>
              <li>
                Questions? Call <a className="font-bold text-sky-deep" href={CLUB.phoneHref}>{CLUB.phone}</a> or email{" "}
                <a className="font-bold break-all text-sky-deep" href={`mailto:${CLUB.email}`}>{CLUB.email}</a>.
              </li>
            </ul>
          </div>
          <Reveal>
            <div className="rounded-3xl bg-mist p-7 ring-1 ring-navy-900/10">
              <h3 className="font-display text-3xl font-extrabold text-navy-900">Mailing address note</h3>
              <p className="mt-2 text-ink/75">
                The club's current website lists Tom Conley Park, 1050 Discovery Drive, Ladson, SC 29456. The older club site also listed
                100 Whitehall Rd., Summerville, SC 29485 for club contact. These are different from the field addresses above — please
                confirm with the club before sending mail.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
