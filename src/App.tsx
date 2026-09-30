import { useEffect, type ComponentType } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer, { MobileCTA } from "./components/Footer";
import { useRoute, type Route } from "./lib/router";
import Home from "./pages/Home";
import About from "./pages/About";
import ProgramsPage, { RegistrationPage } from "./pages/ProgramsPage";
import TeamsPage, { CompetitionPage } from "./pages/TeamsPage";
import NewsPage, { FieldsPage } from "./pages/NewsPage";
import ContactPage, { ResourcesPage } from "./pages/ContactPage";

const PAGES: Record<Route, { C: ComponentType; title: string; desc: string }> = {
  home: {
    C: Home,
    title: "Dorchester United Soccer Club | Youth Soccer in Summerville & Ladson, SC",
    desc: "Dorchester United Soccer Club is a local non-profit youth soccer club in Summerville / Ladson, SC. Little Ballers, Recreation, Junior Academy and Academy. Play Hard, Play Smart, Play UNITED!",
  },
  about: {
    C: About,
    title: "About DUSC | Non-Profit Youth Soccer Club, Summerville SC",
    desc: "Our mission, core values, history and player-centered approach. DUSC is a local 501(c)(3) non-profit removing barriers so every kid who wants to play soccer has a home.",
  },
  programs: {
    C: ProgramsPage,
    title: "Programs | Little Ballers, Recreation, Junior Academy & Academy | DUSC",
    desc: "Youth soccer programs in Summerville and Ladson, SC: Little Ballers, Recreation, Junior Academy and Academy — a pathway for boys and girls from ages 4 to 18.",
  },
  teams: {
    C: TeamsPage,
    title: "Teams & Age Groups | Dorchester United Soccer Club",
    desc: "Find your Dorchester United team: boys and girls competitive age groups U8–U18, plus Recreation and Little Ballers.",
  },
  news: {
    C: NewsPage,
    title: "News | Latest from Dorchester United Soccer Club",
    desc: "Club announcements, registration updates, results and events from Dorchester United Soccer Club.",
  },
  fields: {
    C: FieldsPage,
    title: "Fields & Locations | Tom Conley Field & Oakbrook YMCA | DUSC",
    desc: "Directions and maps for Tom Conley Field (Ladson, SC) and the Oakbrook YMCA (Summerville, SC), home locations of Dorchester United Soccer Club.",
  },
  resources: {
    C: ResourcesPage,
    title: "Resources & Soccer Links | Dorchester United Soccer Club",
    desc: "Registration, SCYSA, PMSL, Open League, Coastal Premier League, tournaments and club store links for Dorchester United families.",
  },
  contact: {
    C: ContactPage,
    title: "Contact | Dorchester United Soccer Club, Ladson & Summerville SC",
    desc: "Contact Dorchester United Soccer Club at (843) 864-5770 or DorchesterUnitedSC@gmail.com, or send an inquiry about programs and evaluations.",
  },
  registration: {
    C: RegistrationPage,
    title: "Registration & Free Evaluations | Dorchester United Soccer Club",
    desc: "Registration for the 2026–2027 soccer year is open. Register for a free evaluation with Dorchester United Soccer Club.",
  },
  competition: {
    C: CompetitionPage,
    title: "Competition | Leagues, Cups & Tournaments | Dorchester United",
    desc: "SCYSA leagues, SC Open Cup, PMSL, James Island Cup and more — where Dorchester United teams compete.",
  },
};

export default function App() {
  const route = useRoute();
  const { C, title, desc } = PAGES[route];

  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
  }, [title, desc]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="sr-only z-[70] rounded-full bg-lime px-5 py-3 font-bold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header route={route} />
      <main id="main" tabIndex={-1} className="outline-none">
        <C key={route} />
      </main>
      <Footer />
      <MobileCTA />
    </MotionConfig>
  );
}
