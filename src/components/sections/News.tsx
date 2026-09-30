import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, CloudLightning, Flag, Megaphone, Ticket, Trophy, X, ClipboardList } from "lucide-react";
import { IMG } from "../../assets";
import { NEWS, type NewsItem } from "../../data/club";
import { cn } from "../../utils/cn";
import { Btn, Container, fmtDate, SectionTitle } from "../ui";

const CAT: Record<NewsItem["category"], { icon: typeof Trophy; grad: string }> = {
  "Club Update": { icon: Megaphone, grad: "from-navy-700 to-navy-900" },
  Registration: { icon: ClipboardList, grad: "from-sky-deep to-navy-800" },
  Results: { icon: Trophy, grad: "from-lime-deep to-navy-900" },
  Events: { icon: Ticket, grad: "from-sky to-navy-800" },
  "Field & Weather": { icon: CloudLightning, grad: "from-slate-600 to-navy-900" },
  Competition: { icon: Flag, grad: "from-navy-800 to-sky-deep" },
};

// Stories older than ~14 months are flagged so old articles never read as current.
export const isArchive = (n: NewsItem) => Date.now() - new Date(n.date).getTime() > 1000 * 60 * 60 * 24 * 425;

function Badge({ n }: { n: NewsItem }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
      <span className="rounded-full bg-lime px-2.5 py-1 text-navy-950">{n.category}</span>
      <span className="inline-flex items-center gap-1 text-current opacity-80">
        <CalendarDays aria-hidden className="size-3.5" />
        <time dateTime={n.date}>{fmtDate(n.date, false)}</time>
      </span>
      {isArchive(n) && <span className="rounded-full border border-current/40 px-2 py-0.5 opacity-80">Archive</span>}
    </div>
  );
}

export function NewsCard({ n, onOpen, index = 0 }: { n: NewsItem; onOpen: (n: NewsItem) => void; index?: number }) {
  const { icon: Icon, grad } = CAT[n.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-navy-900/10 transition-shadow hover:shadow-2xl"
    >
      <div className={cn("relative flex h-36 items-end overflow-hidden bg-gradient-to-br p-4 text-white", grad)}>
        <Icon aria-hidden className="absolute -top-2 -right-2 size-32 rotate-12 text-white/10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-0" />
        <Badge n={n} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-3xl leading-[1.02] font-extrabold text-navy-900">{n.title}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink/75">{n.summary}</p>
        <button
          type="button"
          onClick={() => onOpen(n)}
          className="mt-4 inline-flex items-center gap-1.5 self-start font-display text-lg font-bold tracking-wide text-sky-deep uppercase after:absolute after:inset-0 after:content-['']"
        >
          Read more <span className="sr-only">about {n.title}</span>
          <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </motion.article>
  );
}

export function FeaturedStory({ n, onOpen }: { n: NewsItem; onOpen: (n: NewsItem) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="group relative grid overflow-hidden rounded-3xl bg-navy-900 text-white shadow-xl lg:grid-cols-2"
    >
      <div className="relative min-h-64 overflow-hidden">
        <img
          src={IMG.hero1686}
          alt="Dorchester United U14 Boys team, Spring 2026"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent lg:bg-gradient-to-r" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Badge n={n} />
        <h3 className="mt-4 font-display text-5xl leading-[0.95] font-extrabold sm:text-6xl">{n.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-white/80">{n.summary}</p>
        <div className="mt-6">
          <Btn onClick={() => onOpen(n)}>Read More</Btn>
        </div>
      </div>
    </motion.article>
  );
}

export function NewsModal({ n, onClose }: { n: NewsItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!n) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [n, onClose]);

  return (
    <AnimatePresence>
      {n && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-end bg-navy-950/80 p-0 backdrop-blur-sm sm:place-items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 text-ink outline-none sm:rounded-3xl sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-navy-900 text-white"
            >
              <X aria-hidden className="size-5" />
            </button>
            <div className="text-navy-900">
              <Badge n={n} />
            </div>
            <h2 id="news-modal-title" className="mt-4 pr-10 font-display text-5xl leading-[0.95] font-extrabold text-navy-900">
              {n.title}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed">
              {n.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink/55">Originally published on {n.source}.</p>
            {n.cta && (
              <div className="mt-5">
                <Btn href={n.cta.href} external={n.cta.href.startsWith("http")}>
                  {n.cta.label}
                </Btn>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Homepage — LATEST FROM UNITED */
export function LatestNews() {
  const [open, setOpen] = useState<NewsItem | null>(null);
  const [feat, ...rest] = NEWS;
  return (
    <section className="on-light bg-white py-20 sm:py-28" aria-labelledby="latest-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="NEWS" title={<span id="latest-title">Latest from United</span>} />
          <Btn to="news" variant="outline">
            View News
          </Btn>
        </div>
        <div className="mt-12 space-y-6">
          <FeaturedStory n={feat} onOpen={setOpen} />
          <div className="grid gap-6 md:grid-cols-3">
            {rest.slice(0, 3).map((n, i) => (
              <NewsCard key={n.id} n={n} index={i} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </Container>
      <NewsModal n={open} onClose={() => setOpen(null)} />
    </section>
  );
}
