// import { createContext, useContext, useState, ReactNode } from "react";

// type Lang = "sv" | "en";

// type Translations = {
//   [section: string]: {
//     [key: string]: string;
//   };
// };

// const translations: Record<Lang, Translations> = {
//   sv: {
//     nav: {
//       about: "Om mig",
//       work: "Projekt",
//       contact: "Kontakt",
//     },

//     hero: {
//       subtitle: "Systemutvecklare & programmeringsstudent",
//       greeting: "Hej, jag är",
//       tagline: "Jag bygger och löser problem med kod",
//       description:
//         "Programmeringsstudent vid Linköpings Universitet med erfarenhet av flera programmeringsspråk och projektbaserad systemutveckling.",
//       viewWork: "Se projekt",
//       getInTouch: "Kontakta mig",
//     },

//     about: {
//       label: "Om mig",
//       heading1: "Teknik, kod",
//       heading2: "och problemlösning.",

//       bio1:
//         "Jag är Albin, programmeringsstudent vid Linköpings Universitet med ett stort intresse för teknik, systemutveckling och problemlösning. Genom projektbaserat arbete har jag arbetat med flera programmeringsspråk och utvecklat lösningar både individuellt och i team.",

//       bio2:
//         "Jag är en analytisk och nyfiken person som tycker om att sätta mig in i nya teknologier och utmaningar. På fritiden tränar jag thaiboxning, lyssnar på ljudböcker och utforskar teknik, matematik och fysik.",

//       development: "Programmering",
//       developmentDesc:
//         "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, HTML, CSS, Vue.js och React Native.",

//       design: "Teknik & verktyg",
//       designDesc:
//         "Linux, Windows, Mac, Git, Azure DevOps, Photoshop, Solidworks och Fusion 360.",

//       performance: "Arbetssätt",
//       performanceDesc:
//         "Strukturerad problemlösning, systemutveckling i team och snabb inlärning av nya teknologier.",

//       education: "Utbildning",

//       edu3Title: "Innovativ programmering",
//       edu3School: "Linköpings Universitet",
//       edu3Desc:
//         "Projektbaserad utbildning med fokus på programmering, systemutveckling och problemlösning.",

//       edu2Title: "Datateknik (1 år)",
//       edu2School: "KTH Kista",
//       edu2Desc: "Högskoleingenjörsprogram inom datateknik.",

//       edu1Title: "Teknikprogrammet",
//       edu1School: "ABB Industrigymnasium, Ludvika",
//       edu1Desc:
//         "Gymnasieutbildning inom teknik med fokus på matematik, fysik och tekniska system.",
//     },

//     projects: {
//       label: "Projekt",
//       heading1: "Utvalda",
//       heading2: "projekt.",

//       details: "Projektdetaljer",
//       liveDemo: "Demo",
//       sourceCode: "Källkod",

//       ecomTitle: "Universitetsprojekt",
//       ecomDesc:
//         "Grupprojekt inom programmering och systemutveckling vid Linköpings Universitet.",

//       ecomDetails:
//         "Arbete i team där vi designade och implementerade mjukvarulösningar i olika programmeringsspråk med fokus på struktur, samarbete och problemlösning.",

//       analyticsTitle: "Agricam projekt",
//       analyticsDesc:
//         "Samarbete med företag genom Linköpings Universitet.",

//       analyticsDetails:
//         "Projekt tillsammans med företaget Agricam där vi arbetade med tekniska lösningar och utveckling i nära samarbete med ett verkligt företag.",

//       socialTitle: "Programmeringsprojekt",
//       socialDesc:
//         "Flera kursprojekt inom algoritmer, systemdesign och mjukvaruutveckling.",

//       socialDetails:
//         "Utveckling i språk som C, Python, Java och JavaScript där fokus låg på problemlösning, systemstruktur och samarbete i grupp.",
//     },

//     contact: {
//       label: "Kontakt",
//       heading1: "Kontakta",
//       heading2: "mig.",

//       description:
//         "Är du intresserad av att samarbeta eller har ett jobb eller projekt? Hör gärna av dig.",

//       cta: "Skicka meddelande",

//       footer: "Byggd av Albin Löfgren.",
//     },
//   },

//   en: {
//     nav: {
//       about: "About",
//       work: "Projects",
//       contact: "Contact",
//     },

//     hero: {
//       subtitle: "Software Developer & Programming Student",
//       greeting: "Hi, I'm",
//       tagline: "I build and solve problems with code",
//       description:
//         "Programming student at Linköping University with experience in multiple programming languages and project-based software development.",
//       viewWork: "View Projects",
//       getInTouch: "Get in Touch",
//     },

//     about: {
//       label: "About",
//       heading1: "Technology, code",
//       heading2: "and problem solving.",

//       bio1:
//         "I'm Albin, a programming student at Linköping University with a strong interest in technology, software development and problem solving. Through project-based courses I have worked with several programming languages and built solutions both individually and in teams.",

//       bio2:
//         "I am a curious and analytical person who enjoys learning new technologies and tackling complex problems. In my free time I practice Muay Thai, listen to audiobooks and explore technology, mathematics and physics.",

//       development: "Programming",
//       developmentDesc:
//         "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, HTML, CSS, Vue.js and React Native.",

//       design: "Tools & Technology",
//       designDesc:
//         "Linux, Windows, Mac, Git, Azure DevOps, Photoshop, Solidworks and Fusion 360.",

//       performance: "Work style",
//       performanceDesc:
//         "Structured problem solving, teamwork in software development and fast learning of new technologies.",

//       education: "Education",

//       edu3Title: "Innovative Programming",
//       edu3School: "Linköping University",
//       edu3Desc:
//         "Project-based education focused on programming, software development and problem solving.",

//       edu2Title: "Computer Engineering (1 year)",
//       edu2School: "KTH Kista",
//       edu2Desc: "Bachelor of Science in Computer Engineering.",

//       edu1Title: "Technology Programme",
//       edu1School: "ABB Industrial High School, Ludvika",
//       edu1Desc:
//         "Technical high school education focused on mathematics, physics and engineering.",
//     },

//     projects: {
//       label: "Projects",
//       heading1: "Selected",
//       heading2: "projects.",

//       details: "Project Details",
//       liveDemo: "Demo",
//       sourceCode: "Source Code",

//       ecomTitle: "University Projects",
//       ecomDesc:
//         "Group projects in programming and software development at Linköping University.",

//       ecomDetails:
//         "Worked in teams designing and implementing software solutions using different programming languages with focus on structure, collaboration and problem solving.",

//       analyticsTitle: "Agricam Project",
//       analyticsDesc:
//         "Collaboration with a company through Linköping University.",

//       analyticsDetails:
//         "Project together with the company Agricam where we worked on technical solutions and development in collaboration with a real company.",

//       socialTitle: "Programming Projects",
//       socialDesc:
//         "Multiple course projects involving algorithms, system design and software development.",

//       socialDetails:
//         "Developed software in languages such as C, Python, Java and JavaScript focusing on problem solving and system understanding.",
//     },

//     contact: {
//       label: "Contact",
//       heading1: "Get in",
//       heading2: "touch.",

//       description:
//         "Interested in collaborating or have a job or project opportunity? Feel free to reach out.",

//       cta: "Send Message",

//       footer: "Built by Albin Löfgren.",
//     },
//   },
// };

// interface LanguageContextType {
//   lang: Lang;
//   toggleLang: () => void;
//   t: (section: string, key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(
//   undefined
// );

// export const LanguageProvider = ({ children }: { children: ReactNode }) => {
//   const [lang, setLang] = useState<Lang>("en");

//   const toggleLang = () => setLang((prev) => (prev === "sv" ? "en" : "sv"));

//   const t = (section: string, key: string): string => {
//     return translations[lang]?.[section]?.[key] ?? key;
//   };

//   return (
//     <LanguageContext.Provider value={{ lang, toggleLang, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);

//   if (!context) {
//     throw new Error("useLanguage must be used within LanguageProvider");
//   }

//   return context;
// };

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "sv" | "en";

type Translations = {
  [section: string]: {
    [key: string]: string;
  };
};

const translations: Record<Lang, Translations> = {
  sv: {
    nav: {
      about: "Om mig",
      work: "Projekt",
      contact: "Kontakt",
    },

    hero: {
      subtitle: "Nyexaminerad systemutvecklare",
      greeting: "Hej, jag är",
      tagline: "Jag bygger och löser problem med kod",
      description:
        "Nyexaminerad utvecklare från Linköpings Universitet med erfarenhet av flera programmeringsspråk och projektbaserad systemutveckling.",
      viewWork: "Se projekt",
      getInTouch: "Kontakta mig",
    },

    about: {
      label: "Om mig",
      heading1: "Teknik, kod",
      heading2: "och problemlösning.",

      bio1:
        "Jag är en nyexaminerad utvecklare från Linköpings Universitet med ett starkt intresse för teknik, systemutveckling och problemlösning. Under min utbildning arbetade jag med flera programmeringsspråk och utvecklade mjukvarulösningar både individuellt och i team.",

      bio2:
        "Jag är analytisk och nyfiken och tycker om att sätta mig in i nya teknologier och komplexa problem. På fritiden lyssnar på ljudböcker, spelar datorspel med vänner och tränar Muay Thai.",

      development: "Programmering",
      developmentDesc:
        "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, HTML, CSS, Vue.js och React Native.",

      design: "Teknik & verktyg",
      designDesc:
        "Linux, Windows, Mac, Git, Azure DevOps, Photoshop, Solidworks och Fusion 360.",

      performance: "Arbetssätt",
      performanceDesc:
        "Strukturerad problemlösning, systemutveckling i team och snabb inlärning av nya teknologier.",

      education: "Utbildning",

      edu1Title: "Innovativ programmering",
      edu1School: "Linköpings Universitet",
      edu1Desc:
        "Universitetsutbildning med fokus på programmering, systemutveckling och problemlösning genom projektbaserat arbete.",

      edu2Title: "Datateknik (1 år)",
      edu2School: "KTH Kista",
      edu2Desc:
        "Studier inom högskoleingenjörsprogrammet Datateknik med fokus på programmering och datorsystem.",

      edu3Title: "Teknikprogrammet",
      edu3School: "ABB Industrigymnasium, Ludvika",
      edu3Desc:
        "Gymnasieutbildning inom teknik med fokus på matematik, fysik och tekniska system.",
    },

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

    contact: {
      label: "Kontakt",
      heading1: "Kontakta",
      heading2: "mig.",
      description:
        "Är du intresserad av att samarbeta eller har ett jobb eller projekt? Hör gärna av dig.",
      cta: "Skicka meddelande",
      footer: "Byggd av Albin Löfgren.",
    },
  },

  en: {
    nav: {
      about: "About",
      work: "Projects",
      contact: "Contact",
    },

    hero: {
      subtitle: "Software Developer",
      greeting: "Hi, I'm",
      tagline: "I build and solve problems with code",
      description:
        "Recent graduate from Linköping University with experience in multiple programming languages and project-based software development.",
      viewWork: "View Projects",
      getInTouch: "Get in Touch",
    },

    about: {
      label: "About",
      heading1: "Technology, code",
      heading2: "and problem solving.",

      bio1:
        "I am a recent graduate from Linköping University with a strong interest in technology, software development and problem solving. During my studies I worked with several programming languages and developed software solutions both individually and in teams.",

      bio2:
        "I am a curious and analytical person who enjoys learning new technologies and tackling complex problems. In my free time I listen to audiobooks, play video games with friends and practice Muay Thai.",

      development: "Programming",
      developmentDesc:
        "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, HTML, CSS, Vue.js and React Native.",

      design: "Tools & Technology",
      designDesc:
        "Linux, Windows, Mac, Git, Azure DevOps, Photoshop, Solidworks and Fusion 360.",

      performance: "Work style",
      performanceDesc:
        "Structured problem solving, teamwork in software development and fast learning of new technologies.",

      education: "Education",

      edu1Title: "Innovative Programming",
      edu1School: "Linköping University",
      edu1Desc:
        "University education focused on programming, software development and problem solving through project-based work.",

      edu2Title: "Computer Engineering (1 year)",
      edu2School: "KTH Kista",
      edu2Desc:
        "Studies within the Bachelor of Science in Computer Engineering program.",

      edu3Title: "Technology Programme",
      edu3School: "ABB Industrial High School, Ludvika",
      edu3Desc:
        "Technical high school education focused on mathematics, physics and engineering.",
    },

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

    contact: {
      label: "Contact",
      heading1: "Get in",
      heading2: "touch.",
      description:
        "Interested in collaborating or have a job or project opportunity? Feel free to reach out.",
      cta: "Send Message",
      footer: "Built by Albin Löfgren.",
    },
  },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "sv" ? "en" : "sv"));

  const t = (section: string, key: string): string => {
    return translations[lang]?.[section]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};