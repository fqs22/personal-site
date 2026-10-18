import HeroSection from "@/components/home/HeroSection";
import SkillCloud from "@/components/home/SkillCloud";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactSection from "@/components/home/ContactSection";
import Reveal from "@/components/shared/Reveal";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <SkillCloud />
      </Reveal>
      <Reveal delay={80}>
        <FeaturedProjects />
      </Reveal>
      <Reveal delay={160}>
        <ContactSection />
      </Reveal>
    </>
  );
}
