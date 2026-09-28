/**
 * Pinpoint Game Data (LinkedIn Pinpoint inspired)
 * 5 progressive clues, starting broad and narrowing down to the exact element / compound / process.
 */

export const pinpointQuestions = [
  {
    id: "pinpoint-1",
    target: "Zinc",
    synonyms: ["zn", "zinc metal"],
    category: "Elements & Metallurgy",
    clues: [
      "I am a transition metal placed in the middle of the activity series.",
      "My carbonate ore is called Calamine and my sulphide ore is Zinc Blende.",
      "My oxide is amphoteric, reacting with both hydrochloric acid and sodium hydroxide.",
      "I am used in galvanisation to protect iron and steel from rusting, even if scratched.",
      "My chemical symbol is Zn and atomic number is 30."
    ],
    boardFact: "Zinc oxide (ZnO) reacts with NaOH to form Sodium Zincate (Na₂ZnO₂). In galvanisation, zinc acts as a sacrificial anode because it is more reactive than iron."
  },
  {
    id: "pinpoint-2",
    target: "Cinnabar",
    synonyms: ["mercuric sulphide", "hgs", "mercury sulphide"],
    category: "Ores & Extraction",
    clues: [
      "I am a naturally occurring red mineral ore found in the earth's crust.",
      "I contain an element that is the only liquid metal at standard room temperature.",
      "I am a sulphide ore extracted simply by heating strongly in air (roasting) without carbon.",
      "When roasted, I convert first to mercuric oxide (HgO), which decomposes on further heat.",
      "My chemical formula is HgS."
    ],
    boardFact: "Metals low in the activity series like Mercury (Hg) and Copper (Cu) can be extracted from their sulphide ores by heating alone (thermal reduction)."
  },
  {
    id: "pinpoint-3",
    target: "Aqua Regia",
    synonyms: ["royal water"],
    category: "Chemical Reagents",
    clues: [
      "I am a freshly prepared, highly corrosive, and fuming yellow-orange liquid.",
      "I am capable of dissolving noble metals like gold and platinum that resist single acids.",
      "My name in Latin translates to 'Royal Water'.",
      "I am composed of two concentrated laboratory acids mixed in a specific ratio.",
      "My formula is a 3:1 mixture of concentrated HCl and concentrated HNO₃."
    ],
    boardFact: "Aqua regia is a 3:1 ratio of conc. HCl to conc. HNO₃. Neither acid alone can dissolve gold, but their mixture produces nascent chlorine which dissolves noble metals."
  },
  {
    id: "pinpoint-4",
    target: "Aluminium Oxide",
    synonyms: ["al2o3", "alumina"],
    category: "Oxides & Bonding",
    clues: [
      "I am a white chemical compound formed when a lightweight metal burns in air.",
      "I form an impervious, ultra-thin self-healing protective coat on utensils and foil.",
      "The process of making my protective layer artificially thicker using electrolysis is called Anodising.",
      "I am an amphoteric oxide that reacts with NaOH to produce Sodium Aluminate (NaAlO₂).",
      "My chemical formula is Al₂O₃."
    ],
    boardFact: "Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O. Anodising uses dilute H₂SO₄ as electrolyte where oxygen evolved at the anode thickens the Al₂O₃ layer on the aluminium article."
  },
  {
    id: "pinpoint-5",
    target: "Solder",
    synonyms: ["soldering alloy", "solder alloy"],
    category: "Alloys & Applications",
    clues: [
      "I am a homogeneous metallic mixture (alloy) designed for joining electronic components.",
      "I possess a significantly lower melting point than either of my constituent pure metals.",
      "Electricians and circuit board fabricators use me daily with a heated soldering iron.",
      "My electrical conductivity is lower than pure copper.",
      "I am an alloy composed of Lead (Pb) and Tin (Sn) in roughly 50-50 proportion."
    ],
    boardFact: "Alloying lowers electrical conductivity and melting point. Solder (Pb + Sn) is specifically engineered with a low melting point for welding electrical circuits."
  },
  {
    id: "pinpoint-6",
    target: "Gallium",
    synonyms: ["ga", "caesium"],
    category: "Physical Exceptions",
    clues: [
      "I am a post-transition metal that exists as a solid at normal 25°C room temperature.",
      "However, my melting point is astonishingly low at approximately 30°C (303 K).",
      "If you place a solid piece of me on the palm of your warm hand, I melt into a silvery liquid.",
      "My companion alkali metal with a similarly low melting point is Caesium (Cs).",
      "My atomic number is 31 and chemical symbol is Ga."
    ],
    boardFact: "Gallium (Ga) and Caesium (Cs) are metals with melting points below human body temperature (37°C), causing them to melt on the palm of your hand."
  },
  {
    id: "pinpoint-7",
    target: "Thermit Reaction",
    synonyms: ["thermite", "aluminothermy", "thermite reaction"],
    category: "Metallurgy & Industrial",
    clues: [
      "I am a famous displacement reaction that produces immense, blinding heat.",
      "I utilize aluminium powder as a powerful reducing agent on a metal oxide.",
      "The energy released is so violent that the displaced metal is obtained in a molten liquid state.",
      "Railway track workers and heavy machinery repair teams ignite me on-site to weld cracked joints.",
      "My classic equation is Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat."
    ],
    boardFact: "Thermit reaction: Fe₂O₃ + 2Al → 2Fe(l) + Al₂O₃ + Heat. Aluminium reduces iron(III) oxide to molten liquid iron, which flows directly into cracked rail tracks to weld them."
  },
  {
    id: "pinpoint-8",
    target: "Basic Copper Carbonate",
    synonyms: ["cuco3.cu(oh)2", "copper carbonate", "malachite"],
    category: "Corrosion",
    clues: [
      "I am a greenish coating that slowly develops on shiny copper vessels exposed to air.",
      "I form due to the reaction of copper with atmospheric moisture and carbon dioxide.",
      "I can be easily scrubbed off and cleaned using acidic kitchen items like lemon or tamarind juice.",
      "The sour acid in tamarind (tartaric acid) or lemon (citric acid) neutralizes my basic character.",
      "My chemical composition is basic copper carbonate: CuCO₃·Cu(OH)₂."
    ],
    boardFact: "Copper corrodes in moist air containing CO₂ to form green basic copper carbonate [CuCO₃·Cu(OH)₂]. Sour substances (citric/tartaric acid) neutralize and dissolve this basic layer."
  }
];
