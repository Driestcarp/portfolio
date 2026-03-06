import { useLanguage } from "@/contexts/LanguageContext";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectSocial from "@/assets/project-social.jpg";


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