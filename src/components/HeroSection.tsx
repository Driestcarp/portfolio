import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { personalInfo } from "@/data/portfolio";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-6"
        >
          {t("hero", "subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          {t("hero", "greeting")}{" "}
          <span className="text-gradient">{personalInfo.name.split(" ")[0]}</span>
          {/* <br />
          <span className="text-muted-foreground font-light">{t("hero", "tagline")}</span> */}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
        >
          {t("hero", "description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground font-heading font-medium text-sm tracking-wide rounded-md hover:opacity-90 transition-opacity"
          >
            {t("hero", "viewWork")}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border text-foreground font-heading font-medium text-sm tracking-wide rounded-md hover:border-primary/50 transition-colors"
          >
            {t("hero", "getInTouch")}
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;

// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";

// const HeroSection = () => {
//   const { t } = useLanguage();

//   return (
//     <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
//       <div className="absolute inset-0 opacity-[0.03]" style={{
//         backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
//         backgroundSize: '60px 60px'
//       }} />
//       {/* <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" /> */}

//       <div className="relative z-10 max-w-4xl mx-auto text-center">
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-6"
//         >
//           {t("hero", "subtitle")}
//         </motion.p>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
//         >
//           {t("hero", "greeting")}{" "}
//           <span className="text-gradient">Albin</span>
//           <br />
//           <span className="text-muted-foreground font-light">{t("hero", "tagline")}</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-8 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
//         >
//           {t("hero", "description")}
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="mt-12 flex gap-4 justify-center"
//         >
//           <a
//             href="#projects"
//             className="px-8 py-3 bg-primary text-primary-foreground font-heading font-medium text-sm tracking-wide rounded-md hover:opacity-90 transition-opacity"
//           >
//             {t("hero", "viewWork")}
//           </a>
//           <a
//             href="#contact"
//             className="px-8 py-3 border border-border text-foreground font-heading font-medium text-sm tracking-wide rounded-md hover:border-primary/50 transition-colors"
//           >
//             {t("hero", "getInTouch")}
//           </a>
//         </motion.div>
//       </div>

//       <motion.a
//         href="#about"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 0.6 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
//       >
//         <ArrowDown className="w-5 h-5 animate-bounce" />
//       </motion.a>
//     </section>
//   );
// };

// export default HeroSection;
