import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
