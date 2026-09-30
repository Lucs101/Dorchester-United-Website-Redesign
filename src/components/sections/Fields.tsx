import { motion } from "framer-motion";
import { Clock, ExternalLink, MapPin, RadioTower } from "lucide-react";
import { FIELDS, mapsDirections, mapsEmbed } from "../../data/club";
import { Btn, Container, Reveal, SectionTitle } from "../ui";

/* FIELD STATUS — placeholder until a live feed is connected */
export function FieldStatus() {
  return (
    <div className="rounded-2xl bg-navy-950 p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-3xl font-extrabold">
          <RadioTower aria-hidden className="size-6 text-lime" /> Field Status
        </h3>
        <span className="rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold tracking-wider text-amber-200 uppercase">
          Live feed not connected
        </span>
      </div>
      <ul className="mt-5 divide-y divide-white/10">
        {FIELDS.map((f) => (
          <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="font-display text-2xl font-bold">{f.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/55">
                <Clock aria-hidden className="size-3.5" /> {f.archived}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-display text-lg font-bold tracking-wide text-white/80 uppercase">
              <span aria-hidden className="size-2.5 rounded-full bg-white/40" />
              Status: check club updates
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60" aria-label="Status key for when the live feed is connected">
        <span className="font-bold tracking-wider uppercase">Status key:</span>
        <span className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-full bg-lime" /> Open</span>
        <span className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-full bg-amber-400" /> Delayed</span>
        <span className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-full bg-red-500" /> Closed</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/65">
        This is a placeholder — it is not showing live conditions. Teams post practice and weather updates on their Team Reach
        pages; the previous club site displayed open/closed status per field.
      </p>
    </div>
  );
}

export function FieldCard({ f, i = 0 }: { f: (typeof FIELDS)[number]; i?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.12 }}
      className="on-light flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-navy-900/10"
    >
      <div className="relative aspect-[16/10] bg-navy-900/5">
        <iframe
          title={`Map of ${f.name}, ${f.street}, ${f.city}`}
          src={mapsEmbed(f.query)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-4xl leading-none font-extrabold text-navy-900">{f.name}</h3>
        <address className="mt-3 flex gap-2 text-lg text-ink/85 not-italic">
          <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-sky-deep" />
          <span>
            {f.street}
            <br />
            {f.city}
          </span>
        </address>
        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/70">{f.use}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Btn href={mapsDirections(f.query)} external variant="dark">
            Get Directions
          </Btn>
          {f.site && (
            <a
              href={f.site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-3 font-semibold text-sky-deep underline-offset-4 hover:underline"
            >
              {f.site.label} <ExternalLink aria-hidden className="size-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* Homepage — fields teaser */
export function FieldsPreview() {
  return (
    <section className="on-light bg-mist py-20 sm:py-28" aria-labelledby="fields-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="FIELDS & LOCATIONS"
            title={<span id="fields-title">Where we play</span>}
            lede="Two home locations in the Summerville / Ladson area."
          />
          <Btn to="fields" variant="outline">
            View Fields
          </Btn>
        </div>
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {FIELDS.map((f, i) => (
              <FieldCard key={f.id} f={f} i={i} />
            ))}
          </div>
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4">
            <FieldStatus />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

