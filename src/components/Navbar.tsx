import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav", "about"), href: "#about" },
    { label: t("nav", "work"), href: "#projects" },
    { label: t("nav", "contact"), href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-lg text-primary">
          Albin Löfgren.
        </a>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading tracking-wide hidden sm:block"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-heading tracking-wide text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === "sv" ? "EN" : "SV"}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
