import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, Mail } from "lucide-react";
import { IMG } from "../assets";
import { CLUB, REGISTER_URL, SEASON_BANNER } from "../data/club";
import { Link, type Route } from "../lib/router";
import { cn } from "../utils/cn";

export const NAV: { to: Route; label: string }[] = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "programs", label: "Programs" },
  { to: "teams", label: "Teams" },
  { to: "news", label: "News" },
  { to: "fields", label: "Fields" },
  { to: "resources", label: "Resources" },
  { to: "contact", label: "Contact" },
];

export default function Header({ route }: { route: Route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || route !== "home" || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-navy-950 text-sm text-white/85 transition-all duration-300 lg:block",
          scrolled ? "max-h-0" : "max-h-10"
        )}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-8">
          <p className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="size-2 animate-pulse rounded-full bg-lime" />
            {SEASON_BANNER}
          </p>
          <div className="flex items-center gap-6">
            <a href={CLUB.phoneHref} className="flex items-center gap-2 hover:text-lime">
              <Phone aria-hidden className="size-3.5" /> {CLUB.phone}
            </a>
            <a href={`mailto:${CLUB.email}`} className="flex items-center gap-2 hover:text-lime">
              <Mail aria-hidden className="size-3.5" /> {CLUB.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          solid ? "bg-navy-950/95 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur-md" : "bg-gradient-to-b from-navy-950/70 to-transparent"
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Link to="home" className="flex shrink-0 items-center gap-3" aria-label="Dorchester United Soccer Club — home">
            <img
              src={IMG.logo256}
              alt="Dorchester United Soccer Club logo"
              width={256}
              height={256}
              className={cn("w-auto transition-all duration-300", scrolled ? "h-11" : "h-14")}
            />
            <span className="hidden font-display text-xl leading-none font-bold tracking-wide text-white sm:block xl:hidden 2xl:block">
              Dorchester United
              <span className="block text-xs tracking-[0.25em] text-sky">SOCCER CLUB</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  aria-current={route === n.to ? "page" : undefined}
                  className={cn(
                    "relative block px-3 py-2 font-display text-lg font-semibold tracking-wider text-white/85 uppercase transition-colors hover:text-white",
                    route === n.to && "text-white"
                  )}
                >
                  {n.label}
                  {route === n.to && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-lime" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime px-4 py-2 font-display text-base font-bold tracking-wide text-navy-950 uppercase shadow-[0_6px_24px_-6px_rgba(43,224,0,.7)] transition hover:bg-white sm:px-6 sm:text-lg"
            >
              Registration<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/25 text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className={cn("fixed inset-x-0 bottom-0 overflow-y-auto bg-navy-950 px-5 pt-4 pb-10 lg:hidden", scrolled ? "top-16" : "top-20")}
          >
            <ul className="divide-y divide-white/10">
              {[...NAV, { to: "registration" as Route, label: "Registration Info" }].map((n, i) => (
                <motion.li
                  key={n.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={n.to}
                    aria-current={route === n.to ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-display text-3xl font-bold tracking-wide text-white uppercase",
                      route === n.to && "text-lime"
                    )}
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-lime py-4 text-center font-display text-2xl font-bold tracking-wide text-navy-950 uppercase"
            >
              Register Now
            </a>
            <div className="mt-6 flex flex-col gap-3 text-white/80">
              <a href={CLUB.phoneHref} className="flex items-center gap-3">
                <Phone aria-hidden className="size-5 text-sky" /> {CLUB.phone}
              </a>
              <a href={`mailto:${CLUB.email}`} className="flex items-center gap-3 break-all">
                <Mail aria-hidden className="size-5 text-sky" /> {CLUB.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
