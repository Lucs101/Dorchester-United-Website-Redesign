// Central asset registry. Bundled (and inlined) by Vite so the built site is self-contained.
import logo256 from "./img/logo-256.webp";
import logo640 from "./img/logo-640.webp";
import hero843 from "./img/hero-dusc-u14-843.webp";
import hero1686 from "./img/hero-dusc-u14-1686.webp";
import dribble from "./img/dusc-player-dribble.webp";
import duel from "./img/dusc-player-duel.webp";
import partnerGoose from "./img/partner-goose.webp";
import partnerGur from "./img/partner-gur.webp";
import partnerPuma from "./img/partner-puma.webp";
import partnerSoccer from "./img/partner-soccer.webp";
import stockWarmup from "./img/stock-warmup-coach.webp";
import stockCoach from "./img/stock-coach-goalie.webp";
import stockMatch from "./img/stock-boys-match.webp";
import stockSunny from "./img/stock-kids-sunny.webp";
import stockSocks from "./img/stock-youth-socks.webp";
import videoMd from "./video/hero-training.mp4";
import videoSm from "./video/hero-training-sm.mp4";

export const IMG = {
  logo256,
  logo640,
  hero843,
  hero1686,
  dribble,
  duel,
  partners: { goose: partnerGoose, gur: partnerGur, puma: partnerPuma, soccer: partnerSoccer } as Record<string, string>,
  stock: { warmup: stockWarmup, coach: stockCoach, match: stockMatch, sunny: stockSunny, socks: stockSocks },
};
export const VIDEO = { md: videoMd, sm: videoSm };
