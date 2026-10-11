import HeroSection from "@/components/home/HeroSection";
import SkillCloud from "@/components/home/SkillCloud";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillCloud />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
