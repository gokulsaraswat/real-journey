import { HomeHero } from "@/components/home/home-hero";
import { HomeHighlights } from "@/components/home/home-highlights";
import { HomeStructure } from "@/components/home/home-structure";
import { HomeWritingPreview } from "@/components/home/home-writing-preview";
import { HomeWorkflow } from "@/components/home/home-workflow";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeHighlights />
      <HomeStructure />
      <HomeWritingPreview />
      <HomeWorkflow />
    </>
  );
}
