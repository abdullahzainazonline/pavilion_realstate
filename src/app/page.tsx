import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import LocationFacts from "@/components/sections/LocationFacts";
import UnitLayouts from "@/components/sections/UnitLayouts";
import Facilities from "@/components/sections/Facilities";
import VirtualTour from "@/components/sections/VirtualTour";
import Features from "@/components/sections/Features";
import Contact from "@/components/sections/Contact";
import VideoSection from "@/components/sections/VideoSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg relative overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />

      <Hero />
      <VideoSection />
      <SectionDivider />

      <LocationFacts />
      <SectionDivider />

      <Facilities />
      <SectionDivider />

      <UnitLayouts />
      <SectionDivider />

      <Features />
      <SectionDivider />

      <VirtualTour />
      <SectionDivider />

      <Contact />
    </main>
  );
}
