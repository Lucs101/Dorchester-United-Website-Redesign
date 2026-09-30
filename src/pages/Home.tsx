import Hero from "../components/Hero";
import { Intro, SignatureScroll } from "../components/sections/Intro";
import { Pathway, PlayerDevelopment } from "../components/sections/Programs";
import { UnitedOnTheField } from "../components/sections/Results";
import { LatestNews } from "../components/sections/News";
import { FieldsPreview } from "../components/sections/Fields";
import { Community, FinalCTA, FollowUnited, Gallery, Partners, RegistrationBand } from "../components/sections/Community";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <SignatureScroll />
      <Pathway compact />
      <PlayerDevelopment showPhases={false} />
      <UnitedOnTheField />
      <RegistrationBand />
      <LatestNews />
      <FieldsPreview />
      <Community />
      <Partners />
      <Gallery />
      <FollowUnited />
      <FinalCTA />
    </>
  );
}
