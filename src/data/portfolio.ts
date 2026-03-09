// ============================================================
// PORTFOLIO CONFIG — Edit this file to update personal info
// ============================================================

export const personalInfo = {
  name: "Albin Löfgren",
  email: "albin.lofgren.01@gmail.com",
  github: "https://github.com/Driestcarp/",
  cv: "/CV_Albin_Löfgren.pdf",
  // linkedin: "#",
  // twitter: "#",
};

export const education = [
  {
    year: "2023 – 2026",
    title: { sv: "Innovativ programmering", en: "Innovative Programming" },
    institution: { sv: "Linköpings Universitet", en: "Linköping University" },
    description: {
      sv: "Universitetsutbildning med fokus på programmering, systemutveckling och problemlösning genom projektbaserat arbete.",
      en: "University education focused on programming, software development and problem solving through project-based work.",
    },
  },
  {
    year: "2021 – 2022",
    title: { sv: "Datateknik (1 år)", en: "Computer Engineering (1 year)" },
    institution: { sv: "KTH Kista", en: "KTH Kista" },
    description: {
      sv: "Studier inom högskoleingenjörsprogrammet Datateknik med fokus på programmering och datorsystem.",
      en: "Studies within the Bachelor of Science in Computer Engineering program.",
    },
  },
  {
    year: "2017 – 2020",
    title: { sv: "Teknikprogrammet", en: "Technology Programme" },
    institution: {
      sv: "ABB Industrigymnasium, Ludvika",
      en: "ABB Industrial High School, Ludvika",
    },
    description: {
      sv: "Gymnasieutbildning inom teknik med fokus på matematik, fysik och teknik.",
      en: "Technical high school education focused on mathematics, physics and engineering.",
    },
  },
];

export const skills = [
  {
    icon: "Code2" as const,
    title: { sv: "Programmering", en: "Programming" },
    description: {
      sv: "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, Dart, HTML, CSS, Vue.js GDScript, SQL, och React Native.",
      en: "C, C++, C#, Python, Java, JavaScript, Ruby, Assembly, Flutter, Dart, HTML, CSS, Vue.js GDScript, SQL, and React Native.",
    },
  },
  {
    icon: "Palette" as const,
    title: { sv: "Teknik & verktyg", en: "Tools & Technology" },
    description: {
      sv: "Linux, Windows, Mac, Git, Azure DevOps, Visual Studio, Godot, Photoshop, Solidworks och Fusion 360.",
      en: "Linux, Windows, Mac, Git, Azure DevOps, Visual Studio, Godot, Photoshop, Solidworks and Fusion 360.",
    },
  },
  {
    icon: "Zap" as const,
    title: { sv: "Arbetssätt", en: "Work style" },
    description: {
      sv: "Strukturerad problemlösning, systemutveckling i team och snabb inlärning av nya teknologier.",
      en: "Structured problem solving, teamwork in software development and fast learning of new technologies.",
    },
  },
];
