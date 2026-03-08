import { useLanguage } from "@/contexts/LanguageContext";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectSocial from "@/assets/project-social.jpg";


  const { t } = useLanguage();
  const projects = [
    {
      title: t("projects", "agricamTitle"),
      description: t("projects", "agricamDesc"),
      tags: ["React", "Node.js", "c#", "Azure speech services"],
      color: "from-primary/20 to-primary/5",
      image: projectAgricam,
      details: t("projects", "agricamDetails"),
      
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



  type Lang = "sv" | "en";

  type Translations = {
    [section: string]: {
      [key: string]: string;
    };
  };

  const translations: Record<Lang, Translations> = {
    sv: {
      projects: {
        label: "Projekt",
        heading1: "Utvalda",
        heading2: "projekt.",

        details: "Projektdetaljer",
        liveDemo: "Demo",
        sourceCode: "Källkod",

        ecomTitle: "Universitetsprojekt",
        ecomDesc:
          "Projekt genomförda under universitetsutbildningen inom programmering och systemutveckling.",

        ecomDetails:
          "Grupprojekt där vi designade och implementerade mjukvarulösningar i olika programmeringsspråk med fokus på struktur, samarbete och problemlösning.",

        analyticsTitle: "Agricam-projekt",
        analyticsDesc:
          "Samarbete med företag genom Linköpings Universitet.",

        analyticsDetails:
          "Projekt tillsammans med företaget Agricam där vi utvecklade tekniska lösningar och arbetade nära ett riktigt företag.",

        socialTitle: "Programmeringsprojekt",
        socialDesc:
          "Flera kursprojekt inom algoritmer, systemdesign och mjukvaruutveckling.",

        socialDetails:
          "Utveckling i språk som C, Python, Java och JavaScript där fokus låg på problemlösning, systemstruktur och samarbete i grupp.",
      },
    },
    en: {
      projects: {
        label: "Projects",
        heading1: "Selected",
        heading2: "projects.",

        details: "Project Details",
        liveDemo: "Demo",
        sourceCode: "Source Code",

        ecomTitle: "University Projects",
        ecomDesc:
          "Projects completed during my university education involving programming and software development.",

        ecomDetails:
          "Team-based projects where we designed and implemented software solutions using different programming languages with focus on collaboration and problem solving.",

        analyticsTitle: "Agricam Project",
        analyticsDesc:
          "Collaboration with a company through Linköping University.",

        analyticsDetails:
          "Project together with the company Agricam where we worked on technical solutions and development in collaboration with a real company.",

        socialTitle: "Programming Projects",
        socialDesc:
          "Multiple course projects involving algorithms, system design and software development.",

        socialDetails:
          "Developed solutions in languages such as C, Python, Java and JavaScript focusing on problem solving and system design.",
      },
    },
  };