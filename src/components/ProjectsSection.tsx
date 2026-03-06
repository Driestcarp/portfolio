import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectSocial from "@/assets/project-social.jpg";

const ProjectsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects", "ecomTitle"),
      description: t("projects", "ecomDesc"),
      tags: ["React", "Node.js", "Stripe"],
      color: "from-primary/20 to-primary/5",
      image: projectEcommerce,
      details: t("projects", "ecomDetails"),
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: t("projects", "analyticsTitle"),
      description: t("projects", "analyticsDesc"),
      tags: ["TypeScript", "D3.js", "PostgreSQL"],
      color: "from-blue-500/20 to-blue-500/5",
      image: projectAnalytics,
      details: t("projects", "analyticsDetails"),
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: t("projects", "socialTitle"),
      description: t("projects", "socialDesc"),
      tags: ["React", "WebSocket", "AWS"],
      color: "from-emerald-500/20 to-emerald-500/5",
      image: projectSocial,
      details: t("projects", "socialDetails"),
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4">{t("projects", "label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-16">
            {t("projects", "heading1")}
            <br />
            <span className="text-muted-foreground">{t("projects", "heading2")}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button onClick={() => toggle(i)} className="w-full text-left">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-xs font-heading tracking-wide px-3 py-1 rounded-full border border-border text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 md:px-10 pb-8 md:pb-10 border-t border-border">
                        <div className="pt-8 grid md:grid-cols-2 gap-8">
                          <div className="rounded-lg overflow-hidden border border-border">
                            <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <h4 className="font-heading font-semibold text-lg mb-3">{t("projects", "details")}</h4>
                              <p className="text-muted-foreground leading-relaxed text-sm">{project.details}</p>
                            </div>
                            <div className="flex gap-3 mt-6">
                              <a href={project.liveUrl} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-heading text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                                <ExternalLink className="w-4 h-4" />
                                {t("projects", "liveDemo")}
                              </a>
                              <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-heading text-sm font-medium rounded-md hover:border-primary/50 transition-colors">
                                <Github className="w-4 h-4" />
                                {t("projects", "sourceCode")}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
