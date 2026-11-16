export interface PackningItem {
  name: string;
  antal: string;
  vikt: string;
  description: string;
}

export interface Tillbehor {
  namn: string;
  beskrivning: string;
}

export interface Character {
  id: string;
  namn: string;
  spelare: string;
  slakte: string;
  alder: string;
  yrke: string;
  svaghet: string;
  utseende: string;
  avatar: string; // base64 data URL

  // Grundegenskaper
  sty: string;
  fys: string;
  smi: string;
  int: string;
  psy: string;
  kar: string;

  // Grundegenskaper modifierare (+/-)
  styMod: string;
  fysMod: string;
  smiMod: string;
  intMod: string;
  psyMod: string;
  karMod: string;

  // Tillstånd (conditions)
  utmattad: boolean;
  krasslig: boolean;
  omtocknad: boolean;
  arg: boolean;
  radd: boolean;
  uppgiven: boolean;

  // Skadebonus
  skadebonusSty: string;
  skadebonusSmi: string;
  forflyttning: string;
  barformaga: string;

  // Färdigheter
  fardigheter: Record<string, { checked: boolean; value: string; marks: number }>;
  vapenfardigheter: Record<string, { checked: boolean; value: string; marks: number }>;
  sekundaraFardigheter: { name: string; checked: boolean; value: string; marks: number }[];

  // Förmågor & besvärjelser
  formagor: string;

  // Packning
  packning: PackningItem[];
  minnessak: string;
  smasaker: string;

  // Pengar
  guldmynt: string;
  silvermynt: string;
  kopparmynt: string;

  // Rustning & hjälm
  rustning: string;
  skyddsvardeRustning: string;
  rustningNackdel: string;
  hjalm: string;
  skyddsvardeHjalm: string;
  hjalmNackdel: string;

  // Tillbehör (ringar, smycken etc)
  tillbehor: Tillbehor[];

  // Vapen
  vapen: { namn: string; grepp: string; rackvidd: string; skada: string; brytvarde: string; egenskaper: string }[];

  // Viljepoäng & Kroppspoäng
  viljepoang: number;
  viljepoangMax: number;
  kroppspoang: number;
  kroppspoangMax: number;

  // Dödsslag
  dodsslag: { lyckade: boolean[]; misslyckade: boolean[] };

  // Vila
  snabbVila: boolean;
  kortVila: boolean;

  // UI prefs
  showTooltips: boolean;
}

export const FARDIGHETER = [
  "Bestiologi", "Bluffa", "Fingerfärdighet", "Finna dolda ting",
  "Främmande språk", "Hantverk", "Hoppa & klättra", "Jakt & fiske",
  "Köpslå", "Läkekonst", "Myter & legender", "Rida",
  "Simma", "Sjökunnighet", "Smyga", "Undvika",
  "Uppträda", "Upptäcka fara", "Vildmarksvana", "Övertala"
];

export const FARDIGHETER_ATTR: Record<string, string> = {
  "Bestiologi": "INT", "Bluffa": "KAR", "Fingerfärdighet": "SMI",
  "Finna dolda ting": "INT", "Främmande språk": "INT", "Hantverk": "STY",
  "Hoppa & klättra": "SMI", "Jakt & fiske": "SMI", "Köpslå": "KAR",
  "Läkekonst": "INT", "Myter & legender": "INT", "Rida": "SMI",
  "Simma": "SMI", "Sjökunnighet": "INT", "Smyga": "SMI", "Undvika": "SMI",
  "Uppträda": "KAR", "Upptäcka fara": "INT", "Vildmarksvana": "INT", "Övertala": "KAR"
};

export const FARDIGHETER_DESC: Record<string, string> = {
  "Bestiologi": "Kunskap om monster och varelser",
  "Bluffa": "Ljuga eller vilseleda andra",
  "Fingerfärdighet": "Ficktjuveri, trolleritrick och liknande",
  "Finna dolda ting": "Hitta gömda dörrar, fällor och föremål",
  "Främmande språk": "Förstå och tala okända språk",
  "Hantverk": "Tillverka och reparera föremål",
  "Hoppa & klättra": "Fysisk rörlighet, hoppa och klättra",
  "Jakt & fiske": "Fånga djur och fisk till mat",
  "Köpslå": "Pruta och förhandla om priser",
  "Läkekonst": "Vårda skador och sjukdomar",
  "Myter & legender": "Kunskap om sagor, historia och legender",
  "Rida": "Rida och hantera riddjur",
  "Simma": "Simma och dyka",
  "Sjökunnighet": "Navigera och hantera båtar",
  "Smyga": "Röra sig tyst och osedd",
  "Undvika": "Undvika attacker i strid",
  "Uppträda": "Sjunga, dansa eller underhålla",
  "Upptäcka fara": "Uppfatta dolda hot och faror",
  "Vildmarksvana": "Överleva i vildmarken",
  "Övertala": "Övertyga någon med argument"
};

export const VAPENFARDIGHETER = [
  "Armborst", "Hammare", "Kniv", "Pilbåge",
  "Slagsmål", "Slunga", "Spjut", "Stav", "Svärd", "Yxa"
];

export const VAPENFARDIGHETER_ATTR: Record<string, string> = {
  "Armborst": "SMI", "Hammare": "STY", "Kniv": "SMI", "Pilbåge": "SMI",
  "Slagsmål": "STY", "Slunga": "SMI", "Spjut": "STY", "Stav": "SMI",
  "Svärd": "STY", "Yxa": "STY"
};

export const FIELD_DESCRIPTIONS: Record<string, string> = {
  spelare: "Namnet på dig som spelar karaktären",
  namn: "Karaktärens namn i spelvärlden",
  slakte: "Människor, alver, dvärgar, halvlingar eller vargfolk",
  alder: "Karaktärens ålder – påverkar grundegenskaper",
  yrke: "Karaktärens yrke bestämmer startfärdigheter",
  svaghet: "En personlig svaghet som kan ställa till problem",
  utseende: "Kort beskrivning av karaktärens utseende",
  sty: "Styrka – fysisk kraft och muskelstyrka",
  fys: "Fysik – uthållighet och motståndskraft",
  smi: "Smidighet – snabbhet och koordination",
  int: "Intelligens – kunskap och analysförmåga",
  psy: "Psyke – mental styrka och viljekraft",
  kar: "Karisma – utstrålning och sociala färdigheter",
  skadebonusSty: "Extra skada vid anfall baserat på STY",
  skadebonusSmi: "Extra skada vid anfall baserat på SMI",
  forflyttning: "Antal meter karaktären kan röra sig per runda",
  barformaga: "Hur mycket utrustning karaktären kan bära",
  rustning: "Vilken typ av rustning karaktären bär",
  skyddsvardeRustning: "Antal skadepoäng som rustningen absorberar",
  rustningNackdel: "Nackdel på färdighetsslag pga rustningen",
  hjalm: "Vilken typ av hjälm karaktären bär",
  skyddsvardeHjalm: "Antal skadepoäng som hjälmen absorberar",
  hjalmNackdel: "Nackdel på färdighetsslag pga hjälmen",
  minnessak: "Ett föremål med personligt värde för karaktären",
};

export function createEmptyCharacter(): Character {
  const fardigheter: Record<string, { checked: boolean; value: string; marks: number }> = {};
  FARDIGHETER.forEach(f => { fardigheter[f] = { checked: false, value: "", marks: 0 }; });
  const vapenfardigheter: Record<string, { checked: boolean; value: string; marks: number }> = {};
  VAPENFARDIGHETER.forEach(f => { vapenfardigheter[f] = { checked: false, value: "", marks: 0 }; });

  return {
    id: crypto.randomUUID(),
    namn: "", spelare: "", slakte: "", alder: "", yrke: "", svaghet: "", utseende: "",
    avatar: "",
    sty: "", fys: "", smi: "", int: "", psy: "", kar: "",
    styMod: "", fysMod: "", smiMod: "", intMod: "", psyMod: "", karMod: "",
    utmattad: false, krasslig: false, omtocknad: false, arg: false, radd: false, uppgiven: false,
    skadebonusSty: "", skadebonusSmi: "", forflyttning: "", barformaga: "",
    fardigheter, vapenfardigheter,
    sekundaraFardigheter: Array.from({ length: 6 }, () => ({ name: "", checked: false, value: "", marks: 0 })),
    formagor: "",
    packning: Array.from({ length: 10 }, () => ({ name: "", antal: "", vikt: "", description: "" })),
    minnessak: "", smasaker: "",
    guldmynt: "", silvermynt: "", kopparmynt: "",
    rustning: "", skyddsvardeRustning: "", rustningNackdel: "",
    hjalm: "", skyddsvardeHjalm: "", hjalmNackdel: "",
    tillbehor: Array.from({ length: 4 }, () => ({ namn: "", beskrivning: "" })),
    vapen: Array.from({ length: 4 }, () => ({ namn: "", grepp: "", rackvidd: "", skada: "", brytvarde: "", egenskaper: "" })),
    viljepoang: 0, viljepoangMax: 10,
    kroppspoang: 0, kroppspoangMax: 10,
    dodsslag: { lyckade: [false, false, false], misslyckade: [false, false, false] },
    snabbVila: false, kortVila: false,
    showTooltips: false,
  };
}

/** Migrate old character data to new format */
export function migrateCharacter(c: any): Character {
  // Migrate packning from string[] to PackningItem[]
  if (c.packning && c.packning.length > 0 && typeof c.packning[0] === "string") {
    c.packning = c.packning.map((s: string) => ({ name: s, antal: "", vikt: "", description: "" }));
  }
  // Ensure new fields exist
  if (!c.avatar) c.avatar = "";
  if (!c.rustningNackdel) c.rustningNackdel = "";
  if (!c.hjalmNackdel) c.hjalmNackdel = "";
  if (!c.tillbehor) c.tillbehor = Array.from({ length: 4 }, () => ({ namn: "", beskrivning: "" }));
  if (c.showTooltips === undefined) c.showTooltips = false;
  // Migrate stat modifiers
  ["sty","fys","smi","int","psy","kar"].forEach(k => { if (!c[k+"Mod"]) c[k+"Mod"] = ""; });
  // Migrate skill marks
  if (c.fardigheter) Object.keys(c.fardigheter).forEach(k => { if (c.fardigheter[k].marks === undefined) c.fardigheter[k].marks = 0; });
  if (c.vapenfardigheter) Object.keys(c.vapenfardigheter).forEach(k => { if (c.vapenfardigheter[k].marks === undefined) c.vapenfardigheter[k].marks = 0; });
  if (c.sekundaraFardigheter) c.sekundaraFardigheter.forEach((sf: any) => { if (sf.marks === undefined) sf.marks = 0; });
  return c as Character;
}
