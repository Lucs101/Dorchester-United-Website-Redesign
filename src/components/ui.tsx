import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { href as routeHref, type Route } from "../lib/router";

/* ---------- Reveal: fade-up on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Image reveal with clip mask ---------- */
export function MaskReveal({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right" | "bottom";
  delay?: number;
}) {
  const start =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={className}
      initial={{ clipPath: start }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Counter (only used with real figures) ---------- */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Buttons ---------- */
type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "outline";
  to?: Route;
  href?: string;
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  arrow?: boolean;
};
const variants = {
  primary: "bg-lime text-navy-950 hover:bg-white shadow-[0_8px_30px_-8px_rgba(43,224,0,.65)]",
  secondary: "bg-white text-navy-950 hover:bg-sky hover:text-white",
  ghost: "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
  dark: "bg-navy-900 text-white hover:bg-sky-deep",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
};
export function Btn({
  children,
  variant = "primary",
  to,
  href,
  external,
  className,
  size = "md",
  onClick,
  type,
  arrow = true,
}: BtnProps) {
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-wide transition-colors duration-200",
    size === "lg" ? "px-8 py-4 text-xl" : "px-6 py-3 text-lg",
    variants[variant],
    className
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon
          aria-hidden
          className="size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-px"
        />
      )}
    </>
  );
  const motionProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };
  if (type || onClick) {
    return (
      <motion.button type={type ?? "button"} onClick={onClick} className={cls} {...motionProps}>
        {inner}
      </motion.button>
    );
  }
  const url = to ? routeHref(to) : href;
  return (
    <motion.a
      href={url}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...motionProps}
    >
      {inner}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </motion.a>
  );
}

/* ---------- Section heading ---------- */
export function SectionTitle({
  eyebrow,
  title,
  lede,
  dark,
  center,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 font-display text-lg font-bold tracking-[0.18em]",
            dark ? "text-lime" : "text-sky-deep",
            center && "justify-center"
          )}
        >
          <span aria-hidden className={cn("h-0.5 w-8", dark ? "bg-lime" : "bg-sky-deep")} />
          {eyebrow}
        </p>
      )}
      <As
        className={cn(
          "font-display text-5xl leading-[0.95] font-extrabold sm:text-6xl lg:text-7xl",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </As>
      {lede && (
        <p className={cn("mt-5 text-lg leading-relaxed sm:text-xl", dark ? "text-white/75" : "text-ink/75")}>{lede}</p>
      )}
    </Reveal>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

/* ---------- Sub-page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-16 text-white sm:pt-44 sm:pb-24">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          loading="eager"
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/40" />
      <div aria-hidden className="pitch-lines absolute inset-0 -z-10 opacity-60" />
      <Container>
        <SectionTitle as="h1" dark eyebrow={eyebrow} title={title} lede={lede} />
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

/* ---------- Badge ---------- */
export function Chip({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase",
        dark ? "bg-white/10 text-white" : "bg-sky/15 text-sky-deep"
      )}
    >
      {children}
    </span>
  );
}

export const fmtDate = (iso: string, long = true) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
