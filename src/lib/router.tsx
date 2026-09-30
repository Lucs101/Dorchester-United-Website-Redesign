import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

export const ROUTES = [
  "home",
  "about",
  "programs",
  "teams",
  "news",
  "fields",
  "resources",
  "contact",
  "registration",
  "competition",
] as const;
export type Route = (typeof ROUTES)[number];

const parse = (): Route => {
  const h = window.location.hash.replace(/^#\/?/, "").split("?")[0] as Route;
  return (ROUTES as readonly string[]).includes(h) ? h : "home";
};

export const href = (to: Route) => (to === "home" ? "#/" : `#/${to}`);

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: Route; children: ReactNode };
export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <a href={href(to)} {...rest}>
      {children}
    </a>
  );
}
