import { HomeHero } from "@/components/home/home-hero";
import { HomeHighlights } from "@/components/home/home-highlights";
import { HomeStructure } from "@/components/home/home-structure";
import { HomeWorkflow } from "@/components/home/home-workflow";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeHighlights />
      <HomeStructure />
      <HomeWorkflow />
    </>
  );
}
