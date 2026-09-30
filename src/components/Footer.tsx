import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { IMG } from "../assets";
import { CLUB, LINK_GROUPS, PARTNERS, REGISTER_URL } from "../data/club";
import { FacebookIcon, InstagramIcon } from "./icons";
import { Link, type Route } from "../lib/router";

const QUICK: { to: Route; label: string }[] = [
  { to: "programs", label: "Programs" },
  { to: "teams", label: "Teams" },
  { to: "competition", label: "Competition" },
  { to: "news", label: "News" },
  { to: "fields", label: "Fields" },
  { to: "registration", label: "Registration" },
  { to: "contact", label: "Contact" },
];

export default function Footer() {
  const soccer = LINK_GROUPS.flatMap((g) => g.items).filter((i) =>
    ["SCYSA", "PMSL", "Open League", "Coastal Premier League", "James Island Cup", "Savannah United Finale", "SC Open Cup", "Presidents Cup", "Soccer.com"].includes(i.label)
  );
  return (
    <footer className="bg-navy-950 pt-16 pb-28 text-white/80 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <img src={IMG.logo256} alt="Dorchester United Soccer Club logo" width={256} height={256} loading="lazy" className="h-20 w-auto" />
            <div>
              <p className="font-display text-2xl leading-none font-bold text-white uppercase">Dorchester United Soccer Club</p>
              <p className="mt-1 font-display text-lg font-semibold tracking-wide text-lime">{CLUB.slogan}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A local, independent 501(c)(3) non-profit youth soccer club serving Summerville, Ladson and the surrounding Dorchester
            County area.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={CLUB.phoneHref} className="flex items-center gap-2.5 hover:text-lime">
                <Phone aria-hidden className="size-4 text-sky" /> {CLUB.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CLUB.email}`} className="flex items-center gap-2.5 break-all hover:text-lime">
                <Mail aria-hidden className="size-4 shrink-0 text-sky" /> {CLUB.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-sky" />
              <span>
                Tom Conley Park, 1050 Discovery Drive
                <br />
                Ladson, SC 29456
              </span>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={CLUB.instagram} target="_blank" rel="noopener noreferrer" aria-label="DUSC on Instagram (opens in a new tab)" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-lime hover:text-navy-950">
              <InstagramIcon className="size-5" />
            </a>
            <a href={CLUB.facebook} target="_blank" rel="noopener noreferrer" aria-label="DUSC on Facebook (opens in a new tab)" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-lime hover:text-navy-950">
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold tracking-[0.15em] text-white uppercase">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="home" className="hover:text-lime">Home</Link>
            </li>
            <li>
              <Link to="about" className="hover:text-lime">About</Link>
            </li>
            {QUICK.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="hover:text-lime">{q.label}</Link>
              </li>
            ))}
            <li>
              <Link to="resources" className="hover:text-lime">Resources</Link>
            </li>
          </ul>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full bg-lime px-5 py-2.5 font-display text-lg font-bold tracking-wide text-navy-950 uppercase hover:bg-white">
            Register Now
          </a>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-xl font-bold tracking-[0.15em] text-white uppercase">Important soccer links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {soccer.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-xl font-bold tracking-[0.15em] text-white uppercase">Community partners</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PARTNERS.map((p) => (
              <li key={p.key}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Want to support local kids?{" "}
            <a className="text-lime underline" href={`mailto:${CLUB.programEmail}?subject=Partnering%20with%20DUSC`}>
              Become a partner
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 px-5 pt-6 text-xs text-white/50 sm:px-8 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Dorchester United Soccer Club. All rights reserved.</p>
        <p>Older club contact listing: 100 Whitehall Rd., Summerville, SC 29485 (from dorchesterunited.com)</p>
      </div>
    </footer>
  );
}

/* Sticky mobile registration CTA */
export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        >
          <div className="flex gap-2">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-lime py-3.5 text-center font-display text-xl font-bold tracking-wide text-navy-950 uppercase"
            >
              Register Now
            </a>
            <a href={CLUB.phoneHref} aria-label={`Call ${CLUB.phone}`} className="grid size-[3.25rem] place-items-center rounded-full bg-white/10 text-white">
              <Phone aria-hidden className="size-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
