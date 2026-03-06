import { motion } from "framer-motion";
import { Code2, Palette, Zap, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const skills = [
    { icon: Code2, title: t("about", "development"), description: t("about", "developmentDesc") },
    { icon: Palette, title: t("about", "design"), description: t("about", "designDesc") },
    { icon: Zap, title: t("about", "performance"), description: t("about", "performanceDesc") },
  ];

  const education = [
    {
      year: "2023 – 2026",
      title: t("about", "edu3Title"),
      institution: t("about", "edu3School"),
      description: t("about", "edu3Desc"),
    },
    {
      year: "2021 – 2022",
      title: t("about", "edu2Title"),
      institution: t("about", "edu2School"),
      description: t("about", "edu2Desc"),
    },
    {
      year: "2017 – 2020",
      title: t("about", "edu1Title"),
      institution: t("about", "edu1School"),
      description: t("about", "edu1Desc"),
    },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4">{t("about", "label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
            {t("about", "heading1")}
            <br />
            <span className="text-muted-foreground">{t("about", "heading2")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about", "bio1")}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about", "bio2")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <skill.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-lg mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold">{t("about", "education")}</h3>
          </div>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors group"
            >
              <div className="absolute left-[-7px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors" />
              <p className="text-primary font-heading text-sm tracking-wide mb-1">{edu.year}</p>
              <h4 className="font-heading font-semibold text-lg">{edu.title}</h4>
              <p className="text-muted-foreground text-sm mb-1">{edu.institution}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
