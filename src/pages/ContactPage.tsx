import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Mail, MapPin, Phone, Send } from "lucide-react";
import { IMG } from "../assets";
import { CLUB, FIELDS, LINK_GROUPS, PROGRAM_OPTIONS, REGISTER_URL, mapsDirections, mapsEmbed } from "../data/club";
import { Btn, Container, PageHero, Reveal, SectionTitle } from "../components/ui";
import { FacebookIcon, InstagramIcon } from "../components/icons";
import { FinalCTA, Partners } from "../components/sections/Community";

const input =
  "mt-1.5 w-full rounded-xl border-2 border-navy-900/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-sky focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/25";

function Field({ label, id, required, children }: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold tracking-wide text-navy-900">
        {label} {required ? <span aria-hidden className="text-red-600">*</span> : <span className="font-normal text-ink/50">(optional)</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

function InquiryForm() {
  const [sent, setSent] = useState<null | Record<string, string>>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSent(Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v)])));
  };
  const mailto = () => {
    if (!sent) return "";
    const body = [
      `Parent / Guardian: ${sent.parent}`,
      `Email: ${sent.email}`,
      `Phone: ${sent.phone || "—"}`,
      `Player: ${sent.player}`,
      `Age / Birth year: ${sent.age}`,
      `Program of interest: ${sent.program}`,
      `Heard about us: ${sent.heard || "—"}`,
      "",
      sent.message || "",
    ].join("\n");
    return `mailto:${CLUB.email}?subject=${encodeURIComponent("DUSC inquiry — " + sent.player)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="on-light rounded-3xl bg-white p-6 shadow-xl ring-1 ring-navy-900/10 sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status" className="py-6 text-center">
            <CheckCircle2 aria-hidden className="mx-auto size-16 text-lime-deep" />
            <h3 className="mt-4 font-display text-5xl font-extrabold text-navy-900">Inquiry ready, {sent.parent.split(" ")[0]}!</h3>
            <p className="mx-auto mt-3 max-w-md text-lg text-ink/75">
              Thanks — your details for <strong>{sent.player}</strong> are captured below.{" "}
              <strong>This demo form isn't connected to a server yet, so nothing has been sent.</strong> Tap the button to send it from
              your email app, or call the club.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Btn href={mailto()} size="lg">Email this inquiry</Btn>
              <Btn href={CLUB.phoneHref} variant="outline" size="lg" arrow={false}>Call {CLUB.phone}</Btn>
            </div>
            <button type="button" onClick={() => setSent(null)} className="mt-6 text-sm font-semibold text-sky-deep underline">
              Edit my answers
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="font-display text-4xl font-extrabold text-navy-900">Send us an inquiry</h3>
              <p className="mt-1 text-ink/65">Fields marked * are required.</p>
            </div>
            <Field label="Parent / Guardian name" id="parent" required>
              <input id="parent" name="parent" required autoComplete="name" className={input} placeholder="Full name" />
            </Field>
            <Field label="Email" id="email" required>
              <input id="email" name="email" type="email" required autoComplete="email" className={input} placeholder="you@example.com" />
            </Field>
            <Field label="Phone" id="phone">
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} placeholder="(843) 555-0123" />
            </Field>
            <Field label="Player name" id="player" required>
              <input id="player" name="player" required className={input} placeholder="Player's first & last name" />
            </Field>
            <Field label="Player age / birth year" id="age" required>
              <input id="age" name="age" required className={input} placeholder="e.g. age 9 or born 2017" />
            </Field>
            <Field label="Program of interest" id="program" required>
              <select id="program" name="program" required defaultValue="" className={input}>
                <option value="" disabled>Select a program…</option>
                {PROGRAM_OPTIONS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Message" id="message">
                <textarea id="message" name="message" rows={4} className={input} placeholder="Tell us about your player and any questions you have." />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="How did you hear about us?" id="heard">
                <input id="heard" name="heard" className={input} placeholder="Friend, social media, school, search…" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-8 py-4 font-display text-2xl font-bold tracking-wide text-white uppercase hover:bg-sky-deep sm:w-auto"
              >
                Send inquiry <Send aria-hidden className="size-5" />
              </motion.button>
              <p className="mt-3 text-xs text-ink/55">Demo form: no server is connected, so submissions are not transmitted automatically.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const f = FIELDS[0];
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's get your player on the pitch"
        lede="Questions about programs, evaluations or age groups? Reach out — we're a local club and we're happy to help you find the right fit."
        image={IMG.dribble}
      >
        <Btn href={REGISTER_URL} external>Register Now</Btn>
      </PageHero>

      <section className="on-light bg-mist py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <ul className="space-y-4">
                <li className="flex gap-4 rounded-2xl bg-white p-5 shadow ring-1 ring-navy-900/10">
                  <Phone aria-hidden className="mt-1 size-6 shrink-0 text-sky-deep" />
                  <div>
                    <p className="text-xs font-bold tracking-widest text-ink/55 uppercase">Phone</p>
                    <a href={CLUB.phoneHref} className="font-display text-3xl font-extrabold text-navy-900">{CLUB.phone}</a>
                  </div>
                </li>
                <li className="flex gap-4 rounded-2xl bg-white p-5 shadow ring-1 ring-navy-900/10">
                  <Mail aria-hidden className="mt-1 size-6 shrink-0 text-sky-deep" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-widest text-ink/55 uppercase">Club email</p>
                    <a href={`mailto:${CLUB.email}`} className="block font-display text-2xl font-extrabold break-all text-navy-900 sm:text-3xl">{CLUB.email}</a>
                    <p className="mt-2 text-xs font-bold tracking-widest text-ink/55 uppercase">Program questions</p>
                    <a href={`mailto:${CLUB.programEmail}`} className="font-semibold break-all text-sky-deep">{CLUB.programEmail}</a>
                  </div>
                </li>
                <li className="flex gap-4 rounded-2xl bg-white p-5 shadow ring-1 ring-navy-900/10">
                  <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-sky-deep" />
                  <div>
                    <p className="text-xs font-bold tracking-widest text-ink/55 uppercase">Club address (current website)</p>
                    <p className="font-semibold text-navy-900">Tom Conley Park<br />1050 Discovery Drive<br />Ladson, SC 29456</p>
                    <p className="mt-3 text-xs font-bold tracking-widest text-ink/55 uppercase">Older listing (mailing)</p>
                    <p className="text-ink/80">100 Whitehall Rd.<br />Summerville, SC 29485</p>
                    <p className="mt-3 text-xs font-bold tracking-widest text-ink/55 uppercase">Recreation &amp; Little Ballers site</p>
                    <p className="text-ink/80">Oakbrook YMCA, 900 Crosscreek Dr, Summerville, SC 29485</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-navy-900 p-5 text-white">
                  <span className="font-display text-xl font-bold tracking-wide">Follow:</span>
                  <a href={CLUB.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-lime hover:text-navy-950"><InstagramIcon className="size-5" /></a>
                  <a href={CLUB.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-lime hover:text-navy-950"><FacebookIcon className="size-5" /></a>
                  <span className="text-sm text-white/70">{CLUB.instagramHandle}</span>
                </li>
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </Container>
      </section>

      <section className="on-light bg-white py-16 sm:py-20">
        <Container>
          <SectionTitle eyebrow="FIND US" title="Tom Conley Park" />
          <div className="mt-8 overflow-hidden rounded-3xl shadow-lg ring-1 ring-navy-900/10">
            <iframe
              title={`Map of ${f.venue}`}
              src={mapsEmbed(f.query)}
              loading="lazy"
              className="h-72 w-full border-0 sm:h-96"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-5"><Btn href={mapsDirections(f.query)} external variant="dark">Get Directions</Btn></div>
        </Container>
      </section>
      <Partners />
      <FinalCTA />
    </>
  );
}

export function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="RESOURCES"
        title="Important links & soccer resources"
        lede="Registration, league and tournament sites, governing bodies and the club store — all the links from the club's websites in one organized place."
        image={IMG.stock.sunny}
      >
        <Btn href={REGISTER_URL} external>Register Now</Btn>
        <Btn to="registration" variant="ghost">How Registration Works</Btn>
      </PageHero>
      <section className="on-light bg-mist py-16 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          {LINK_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={(gi % 2) * 0.08}>
              <section className="h-full rounded-3xl bg-white p-6 shadow-md ring-1 ring-navy-900/10 sm:p-8" aria-labelledby={`g-${gi}`}>
                <h2 id={`g-${gi}`} className="font-display text-4xl font-extrabold text-navy-900">{g.title}</h2>
                <p className="mt-1 text-ink/65">{g.blurb}</p>
                <ul className="mt-5 divide-y divide-navy-900/10">
                  {g.items.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 py-3.5">
                        <span>
                          <span className="block font-display text-2xl font-bold text-navy-900 transition-colors group-hover:text-sky-deep">{l.label}</span>
                          <span className="text-sm text-ink/55">{l.note}</span>
                        </span>
                        <ExternalLink aria-hidden className="size-5 shrink-0 text-sky-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </Container>
      </section>
      <Partners title="Community partners" />
      <FinalCTA />
    </>
  );
}
