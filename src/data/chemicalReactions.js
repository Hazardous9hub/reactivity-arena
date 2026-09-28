/**
 * CBSE Class 10 Chemistry - Chapter 3: Metals & Non-Metals
 * Master Chemical Reactions Bank with state symbols, conditions, and board exam notes.
 */

export const chemicalReactions = [
  // --- Reaction with Oxygen ---
  {
    id: "rx-o2-cu",
    title: "Copper Oxidation",
    category: "Reaction with Oxygen",
    reactants: "2Cu(s) + O₂(g)",
    conditions: "Heated in air",
    products: "2CuO(s)",
    description: "Copper does not burn, but gets coated with a black layer of copper(II) oxide.",
    boardTrap: "Copper does not burn with flame; forms black CuO surface coating."
  },
  {
    id: "rx-o2-al",
    title: "Aluminium Oxidation",
    category: "Reaction with Oxygen",
    reactants: "4Al(s) + 3O₂(g)",
    conditions: "Room temperature exposure / heating",
    products: "2Al₂O₃(s)",
    description: "Forms an impervious, protective layer of aluminium oxide that prevents further corrosion.",
    boardTrap: "This oxide layer is why aluminium is used for food packaging despite being reactive."
  },
  {
    id: "rx-o2-mg",
    title: "Magnesium Ribbon Burning",
    category: "Reaction with Oxygen",
    reactants: "2Mg(s) + O₂(g)",
    conditions: "Ignition with burner",
    products: "2MgO(s)",
    description: "Burns with a dazzling white flame to form basic white powder of magnesium oxide.",
    boardTrap: "The ash formed is basic: MgO + H₂O → Mg(OH)₂ (turns red litmus blue)."
  },

  // --- Amphoteric Oxides ---
  {
    id: "rx-amph-al-acid",
    title: "Aluminium Oxide + Acid",
    category: "Amphoteric Nature",
    reactants: "Al₂O₃(s) + 6HCl(aq)",
    conditions: "Room temperature",
    products: "2AlCl₃(aq) + 3H₂O(l)",
    description: "Aluminium oxide acts as a base and neutralizes hydrochloric acid to form salt and water.",
    boardTrap: "Must balance with 6HCl → 2AlCl₃ + 3H₂O."
  },
  {
    id: "rx-amph-al-base",
    title: "Aluminium Oxide + Base",
    category: "Amphoteric Nature",
    reactants: "Al₂O₃(s) + 2NaOH(aq)",
    conditions: "Warm / aqueous",
    products: "2NaAlO₂(aq) + H₂O(l)",
    description: "Aluminium oxide acts as an acid and reacts with strong base sodium hydroxide to form Sodium Aluminate.",
    boardTrap: "Product is Sodium Aluminate (NaAlO₂). Very common 3-mark board question!"
  },
  {
    id: "rx-amph-zn-acid",
    title: "Zinc Oxide + Acid",
    category: "Amphoteric Nature",
    reactants: "ZnO(s) + 2HCl(aq)",
    conditions: "Room temperature",
    products: "ZnCl₂(aq) + H₂O(l)",
    description: "Zinc oxide behaves as a base, reacting with hydrochloric acid to form zinc chloride and water.",
    boardTrap: "Shows dual behavior; reacts with both acids and bases."
  },
  {
    id: "rx-amph-zn-base",
    title: "Zinc Oxide + Base",
    category: "Amphoteric Nature",
    reactants: "ZnO(s) + 2NaOH(aq)",
    conditions: "Warm / aqueous",
    products: "Na₂ZnO₂(aq) + H₂O(l)",
    description: "Zinc oxide reacts with sodium hydroxide to form Sodium Zincate and water.",
    boardTrap: "Product formula is Na₂ZnO₂ (Sodium Zincate)."
  },

  // --- Reaction with Water ---
  {
    id: "rx-water-na",
    title: "Sodium with Cold Water",
    category: "Reaction with Water",
    reactants: "2Na(s) + 2H₂O(l)",
    conditions: "Cold water (Violent & Exothermic)",
    products: "2NaOH(aq) + H₂(g) + Heat",
    description: "Reacts violently; the heat evolved is so high that hydrogen catches fire immediately.",
    boardTrap: "Stored in kerosene to prevent spontaneous combustion with atmospheric air/moisture."
  },
  {
    id: "rx-water-ca",
    title: "Calcium with Cold Water",
    category: "Reaction with Water",
    reactants: "Ca(s) + 2H₂O(l)",
    conditions: "Cold water (Less violent)",
    products: "Ca(OH)₂(aq) + H₂(g)",
    description: "Reaction is less violent; heat is insufficient for hydrogen to ignite. Calcium starts floating.",
    boardTrap: "Why does Calcium float? Bubbles of H₂ gas adhere to the metal surface, lifting it up!"
  },
  {
    id: "rx-water-mg",
    title: "Magnesium with Hot Water",
    category: "Reaction with Water",
    reactants: "Mg(s) + 2H₂O(l)",
    conditions: "Hot water (Does not react with cold water)",
    products: "Mg(OH)₂(aq) + H₂(g)",
    description: "Reacts with hot water to form magnesium hydroxide and hydrogen. It also floats due to H₂ bubbles.",
    boardTrap: "Mg does NOT react with cold water, only hot water or steam."
  },
  {
    id: "rx-water-fe-steam",
    title: "Iron with Steam",
    category: "Reaction with Water",
    reactants: "3Fe(s) + 4H₂O(g)",
    conditions: "Red hot iron with steam",
    products: "Fe₃O₄(s) + 4H₂(g)",
    description: "Iron reacts only with steam to produce magnetic iron oxide (Fe₃O₄) and hydrogen gas.",
    boardTrap: "Product is Fe₃O₄ (Iron II,III oxide), NOT Fe₂O₃ or FeO!"
  },
  {
    id: "rx-water-al-steam",
    title: "Aluminium with Steam",
    category: "Reaction with Water",
    reactants: "2Al(s) + 3H₂O(g)",
    conditions: "Steam only",
    products: "Al₂O₃(s) + 3H₂(g)",
    description: "Aluminium does not react with cold or hot water; reacts with steam to form oxide and hydrogen.",
    boardTrap: "Forms metal oxide (Al₂O₃), NOT hydroxide."
  },

  // --- Reaction with Acids & Nitric Acid Exception ---
  {
    id: "rx-acid-mg-hcl",
    title: "Magnesium with Hydrochloric Acid",
    category: "Reaction with Acids",
    reactants: "Mg(s) + 2HCl(aq)",
    conditions: "Dilute acid (Rapid bubbling)",
    products: "MgCl₂(aq) + H₂(g)",
    description: "Most exothermic reaction with rapid effervescence among common metals (Mg > Al > Zn > Fe).",
    boardTrap: "Copper shows NO reaction with dilute HCl."
  },
  {
    id: "rx-acid-hno3-exception",
    title: "Magnesium with Very Dilute Nitric Acid",
    category: "Nitric Acid Anomaly",
    reactants: "Mg(s) + 2HNO₃(very dil.)",
    conditions: "Very dilute (~1%) HNO₃",
    products: "Mg(NO₃)₂(aq) + H₂(g)",
    description: "Generally metals do NOT produce H₂ with HNO₃ because it is a strong oxidizer. Only Mg and Mn evolve H₂ with very dilute HNO₃.",
    boardTrap: "Top Board Question: Why no H₂ with HNO₃? HNO₃ oxidizes H₂ to H₂O and reduces to NOx. Exception metals: Mg and Mn."
  },

  // --- Metallurgy & Extraction ---
  {
    id: "rx-metal-roast-zns",
    title: "Roasting of Zinc Blende",
    category: "Metallurgy: Roasting",
    reactants: "2ZnS(s) + 3O₂(g)",
    conditions: "Heated strongly in EXCESS air",
    products: "2ZnO(s) + 2SO₂(g)↑",
    description: "Sulphide ores are converted into oxides by heating strongly in excess air.",
    boardTrap: "Roasting is for SULPHIDE ores (Excess air). Gives SO₂ gas."
  },
  {
    id: "rx-metal-calc-znco3",
    title: "Calcination of Calamine Ore",
    category: "Metallurgy: Calcination",
    reactants: "ZnCO₃(s)",
    conditions: "Heated strongly in ABSENCE / LIMITED air",
    products: "ZnO(s) + CO₂(g)↑",
    description: "Carbonate ores are converted into oxides by heating in limited air.",
    boardTrap: "Calcination is for CARBONATE ores (Limited/no air). Gives CO₂ gas."
  },
  {
    id: "rx-metal-reduce-c",
    title: "Reduction of Zinc Oxide with Carbon (Smelting)",
    category: "Metallurgy: Reduction",
    reactants: "ZnO(s) + C(s)",
    conditions: "Heating with coke",
    products: "Zn(s) + CO(g)",
    description: "Zinc oxide is reduced to metallic zinc using carbon as reducing agent.",
    boardTrap: "Known as Smelting. Carbon cannot reduce oxides of Na, Mg, Ca, Al because they have higher affinity for oxygen."
  },
  {
    id: "rx-metal-thermit",
    title: "Thermit Reaction (Welding Railway Tracks)",
    category: "Metallurgy: Thermit Reaction",
    reactants: "Fe₂O₃(s) + 2Al(s)",
    conditions: "Ignition mixture (Mg ribbon + BaO₂)",
    products: "2Fe(l) + Al₂O₃(s) + Enormous Heat",
    description: "Displacement reaction is so intensely exothermic that iron is produced in molten state, filling cracked tracks.",
    boardTrap: "Iron is produced as LIQUID (Fe(l)). Aluminium acts as the reducing agent."
  },
  {
    id: "rx-metal-cinnabar",
    title: "Extraction of Mercury from Cinnabar",
    category: "Metallurgy: Low Reactivity",
    reactants: "2HgS(s) + 3O₂(g) → 2HgO(s) + 2SO₂(g) ; then 2HgO(s) → 2Hg(l) + O₂(g)",
    conditions: "Heating alone",
    products: "2Hg(l) + O₂(g)",
    description: "Metals low in reactivity (Hg, Cu) are extracted by thermal reduction (heating alone).",
    boardTrap: "No reducing agent like carbon is needed; heating alone suffices."
  },

  // --- Electrolytic Refining ---
  {
    id: "rx-metal-refining-cu",
    title: "Electrolytic Refining of Copper",
    category: "Metallurgy: Refining",
    reactants: "Anode: Cu(impure) → Cu²⁺ + 2e⁻ ; Cathode: Cu²⁺ + 2e⁻ → Cu(pure)",
    conditions: "Acidified CuSO₄ electrolyte with DC current",
    products: "Pure Copper deposited at cathode, Anode Mud settled beneath anode",
    description: "Impure copper anode dissolves; pure copper deposits on thin cathode strip. Precious metals (Ag, Au) settle as anode mud.",
    boardTrap: "Anode = IMPURE thick slab. Cathode = PURE thin strip. Insoluble impurities = ANODE MUD."
  }
];
