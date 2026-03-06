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
//       subtitle: "Utvecklare & Designer",
//       greeting: "Hej, jag är",
//       tagline: "Jag bygger saker",
//       description: "En fullstack-utvecklare med passion för att skapa rena, snabba digitala upplevelser.",
//       viewWork: "Se projekt",
//       getInTouch: "Kontakta mig",
//     },
//     about: {
//       label: "Om mig",
//       heading1: "Idéer blir",
//       heading2: "verklighet.",
//       bio1: "Jag är Albin — en fullstack-utvecklare och designer baserad i Berlin. Med över 5 års erfarenhet specialiserar jag mig på att bygga moderna webbapplikationer som är både vackra och funktionella. Jag bryr mig djupt om ren kod, användarupplevelse och pixelperfekt design.",
//       bio2: "När jag inte kodar hittar du mig vandrandes i skogen, fotograferandes landskap eller experimenterandes med generativ konst. Jag tror att bra mjukvara formas av nyfikenhet och en djup förståelse för människorna som använder den.",
//       development: "Utveckling",
//       developmentDesc: "React, TypeScript, Node.js och moderna webbteknologier.",
//       design: "Design",
//       designDesc: "Rena gränssnitt med fokus på typografi och mellanrum.",
//       performance: "Prestanda",
//       performanceDesc: "Snabbt, tillgängligt och optimerat för alla enheter.",
//       education: "Utbildning",
//       edu1Title: "M.Sc. Datavetenskap",
//       edu1School: "Tekniska Universitetet i Berlin",
//       edu1Desc: "Specialisering inom människa-datorinteraktion och distribuerade system. Examensarbete om realtids-samarbetsverktyg för webben.",
//       edu2Title: "B.Sc. Mjukvaruutveckling",
//       edu2School: "Münchens Universitet",
//       edu2Desc: "Fokus på fullstack-utveckling, algoritmer och UX-design.",
//     },
//     projects: {
//       label: "Projekt",
//       heading1: "Utvalda",
//       heading2: "projekt.",
//       details: "Projektdetaljer",
//       liveDemo: "Live Demo",
//       sourceCode: "Källkod",
//       ecomTitle: "E-handelsplattform",
//       ecomDesc: "En fullstack-shoppingupplevelse med realtidslager, betalningar och adminpanel.",
//       ecomDetails: "Byggde en komplett e-handelslösning med produktkatalog, realtidslagerspårning, Stripe-betalning och en omfattande adminpanel med analyser. Plattformen stödjer flera valutor, önskelistor och orderspårning.",
//       analyticsTitle: "Analysdashboard",
//       analyticsDesc: "Interaktivt datavisualiseringsverktyg med anpassade diagram, filter och PDF-export.",
//       analyticsDetails: "Designade och utvecklade en interaktiv analysplattform med anpassade D3.js-visualiseringar, realtidsdataströmning via WebSockets, avancerade filter och datumval, samt automatiserad PDF-rapportgenerering.",
//       socialTitle: "Social App",
//       socialDesc: "Realtidsmeddelanden och innehållsdelning med mediauppladdning och notifikationer.",
//       socialDetails: "Skapade en social nätverksapp med realtidsmeddelanden via WebSockets, mediauppladdning via AWS S3 och Lambda, push-notifikationer, innehållsflöden med oändlig scroll och användarprofilanpassning.",
//     },
//     contact: {
//       label: "Kontakt",
//       heading1: "Låt oss jobba",
//       heading2: "tillsammans.",
//       description: "Har du ett projekt i åtanke? Jag vill gärna höra om det. Skicka ett meddelande så skapar vi något fantastiskt.",
//       cta: "Säg hej",
//       footer: "Byggd med passion.",
//     },
//   },
//   en: {
//     nav: {
//       about: "About",
//       work: "Work",
//       contact: "Contact",
//     },
//     hero: {
//       subtitle: "Developer & Designer",
//       greeting: "Hi, I'm",
//       tagline: "I build things",
//       description: "A full-stack developer passionate about crafting clean, performant digital experiences.",
//       viewWork: "View Work",
//       getInTouch: "Get in Touch",
//     },
//     about: {
//       label: "About",
//       heading1: "Turning ideas into",
//       heading2: "reality.",
//       bio1: "I'm Albin — a full-stack developer and designer based in Berlin. With over 5 years of experience, I specialize in building modern web applications that are both beautiful and functional. I care deeply about clean code, user experience, and pixel-perfect design.",
//       bio2: "When I'm not coding, you'll find me hiking through forests, photographing landscapes, or experimenting with generative art. I believe great software is shaped by curiosity and a deep understanding of the people who use it.",
//       development: "Development",
//       developmentDesc: "React, TypeScript, Node.js, and modern web technologies.",
//       design: "Design",
//       designDesc: "Clean interfaces with attention to typography and spacing.",
//       performance: "Performance",
//       performanceDesc: "Fast, accessible, and optimized for every device.",
//       education: "Education",
//       edu1Title: "M.Sc. Computer Science",
//       edu1School: "Technical University of Berlin",
//       edu1Desc: "Specialized in Human-Computer Interaction and distributed systems. Thesis on real-time collaborative web applications.",
//       edu2Title: "B.Sc. Software Engineering",
//       edu2School: "University of Munich",
//       edu2Desc: "Focused on full-stack development, algorithms, and UX design fundamentals.",
//     },
//     projects: {
//       label: "Work",
//       heading1: "Selected",
//       heading2: "projects.",
//       details: "Project Details",
//       liveDemo: "Live Demo",
//       sourceCode: "Source Code",
//       ecomTitle: "E-Commerce Platform",
//       ecomDesc: "A full-stack shopping experience with real-time inventory, payments, and admin dashboard.",
//       ecomDetails: "Built a complete e-commerce solution featuring product catalog management, real-time inventory tracking, Stripe payment integration, and a comprehensive admin dashboard with analytics. The platform supports multi-currency, wishlists, and order tracking.",
//       analyticsTitle: "Analytics Dashboard",
//       analyticsDesc: "Interactive data visualization tool with custom charts, filters, and PDF export.",
//       analyticsDetails: "Designed and developed an interactive analytics platform with custom D3.js visualizations, real-time data streaming via WebSockets, advanced filtering and date-range selection, and automated PDF report generation. Handles millions of data points efficiently.",
//       socialTitle: "Social App",
//       socialDesc: "Real-time messaging and content sharing platform with media uploads and notifications.",
//       socialDetails: "Created a social networking app with real-time messaging powered by WebSockets, media upload and processing via AWS S3 and Lambda, push notifications, content feeds with infinite scroll, and user profile customization.",
//     },
//     contact: {
//       label: "Contact",
//       heading1: "Let's work",
//       heading2: "together.",
//       description: "Got a project in mind? I'd love to hear about it. Drop me a line and let's create something great.",
//       cta: "Say Hello",
//       footer: "Built with passion.",
//     },
//   },
// };

// interface LanguageContextType {
//   lang: Lang;
//   toggleLang: () => void;
//   t: (section: string, key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
//   if (!context) throw new Error("useLanguage must be used within LanguageProvider");
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
      subtitle: "Systemutvecklare & programmeringsstudent",
      greeting: "Hej, jag är",
      tagline: "Jag bygger och löser problem med kod",
      description:
        "Programmeringsstudent vid Linköpings Universitet med erfarenhet av flera programmeringsspråk och projektbaserad systemutveckling.",
      viewWork: "Se projekt",
      getInTouch: "Kontakta mig",
    },

    about: {
      label: "Om mig",
      heading1: "Teknik, kod",
      heading2: "och problemlösning.",

      bio1:
        "Jag är Albin, programmeringsstudent vid Linköpings Universitet med ett stort intresse för teknik, systemutveckling och problemlösning. Genom projektbaserat arbete har jag arbetat med flera programmeringsspråk och utvecklat lösningar både individuellt och i team.",

      bio2:
        "Jag är en analytisk och nyfiken person som tycker om att sätta mig in i nya teknologier och utmaningar. På fritiden tränar jag thaiboxning, lyssnar på ljudböcker och utforskar teknik, matematik och fysik.",

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

      edu3Title: "Innovativ programmering",
      edu3School: "Linköpings Universitet",
      edu3Desc:
        "Projektbaserad utbildning med fokus på programmering, systemutveckling och problemlösning.",

      edu2Title: "Datateknik (1 år)",
      edu2School: "KTH Kista",
      edu2Desc: "Högskoleingenjörsprogram inom datateknik.",

      edu1Title: "Teknikprogrammet",
      edu1School: "ABB Industrigymnasium, Ludvika",
      edu1Desc:
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
        "Grupprojekt inom programmering och systemutveckling vid Linköpings Universitet.",

      ecomDetails:
        "Arbete i team där vi designade och implementerade mjukvarulösningar i olika programmeringsspråk med fokus på struktur, samarbete och problemlösning.",

      analyticsTitle: "Agricam projekt",
      analyticsDesc:
        "Samarbete med företag genom Linköpings Universitet.",

      analyticsDetails:
        "Projekt tillsammans med företaget Agricam där vi arbetade med tekniska lösningar och utveckling i nära samarbete med ett verkligt företag.",

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
      subtitle: "Software Developer & Programming Student",
      greeting: "Hi, I'm",
      tagline: "I build and solve problems with code",
      description:
        "Programming student at Linköping University with experience in multiple programming languages and project-based software development.",
      viewWork: "View Projects",
      getInTouch: "Get in Touch",
    },

    about: {
      label: "About",
      heading1: "Technology, code",
      heading2: "and problem solving.",

      bio1:
        "I'm Albin, a programming student at Linköping University with a strong interest in technology, software development and problem solving. Through project-based courses I have worked with several programming languages and built solutions both individually and in teams.",

      bio2:
        "I am a curious and analytical person who enjoys learning new technologies and tackling complex problems. In my free time I practice Muay Thai, listen to audiobooks and explore technology, mathematics and physics.",

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

      edu3Title: "Innovative Programming",
      edu3School: "Linköping University",
      edu3Desc:
        "Project-based education focused on programming, software development and problem solving.",

      edu2Title: "Computer Engineering (1 year)",
      edu2School: "KTH Kista",
      edu2Desc: "Bachelor of Science in Computer Engineering.",

      edu1Title: "Technology Programme",
      edu1School: "ABB Industrial High School, Ludvika",
      edu1Desc:
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
        "Group projects in programming and software development at Linköping University.",

      ecomDetails:
        "Worked in teams designing and implementing software solutions using different programming languages with focus on structure, collaboration and problem solving.",

      analyticsTitle: "Agricam Project",
      analyticsDesc:
        "Collaboration with a company through Linköping University.",

      analyticsDetails:
        "Project together with the company Agricam where we worked on technical solutions and development in collaboration with a real company.",

      socialTitle: "Programming Projects",
      socialDesc:
        "Multiple course projects involving algorithms, system design and software development.",

      socialDetails:
        "Developed software in languages such as C, Python, Java and JavaScript focusing on problem solving and system understanding.",
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