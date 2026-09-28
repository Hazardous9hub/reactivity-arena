/**
 * Crossclimb Game Data (Reactivity Series Ladder & Trivia Climb)
 * Inspired by LinkedIn Crossclimb and SciChamp reactivity games.
 */

export const reactivitySeries = [
  { symbol: "K", name: "Potassium", reactivity: 14, tier: "Violent with cold water", flame: "Lilac" },
  { symbol: "Na", name: "Sodium", reactivity: 13, tier: "Catches fire in cold water", flame: "Golden Yellow" },
  { symbol: "Ca", name: "Calcium", reactivity: 12, tier: "Floats in cold water with H₂ bubbles", flame: "Brick Red" },
  { symbol: "Mg", name: "Magnesium", reactivity: 11, tier: "Reacts with hot water; dazzles in air", flame: "Dazzling White" },
  { symbol: "Al", name: "Aluminium", reactivity: 10, tier: "Reacts only with steam; protective Al₂O₃", flame: "White" },
  { symbol: "Zn", name: "Zinc", reactivity: 9, tier: "Reacts with steam; Calamine ore", flame: "Bluish Green" },
  { symbol: "Fe", name: "Iron", reactivity: 8, tier: "Reacts with steam to give Fe₃O₄", flame: "Orange Sparks" },
  { symbol: "Pb", name: "Lead", reactivity: 7, tier: "No reaction with water; poor heat conductor", flame: "Grayish" },
  { symbol: "H", name: "Hydrogen", reactivity: 6, tier: "Reference non-metal; displaced by metals above it", flame: "Pale Blue" },
  { symbol: "Cu", name: "Copper", reactivity: 5, tier: "Does not displace H₂; forms black CuO", flame: "Green" },
  { symbol: "Hg", name: "Mercury", reactivity: 4, tier: "Liquid metal; extracted from cinnabar", flame: "None" },
  { symbol: "Ag", name: "Silver", reactivity: 3, tier: "Tarnishes to black Ag₂S with H₂S gas", flame: "None" },
  { symbol: "Au", name: "Gold", reactivity: 2, tier: "Most malleable and ductile; dissolved by aqua regia", flame: "None" },
  { symbol: "Pt", name: "Platinum", reactivity: 1, tier: "Noble unreactive metal; royal ornaments", flame: "None" }
];

export const ladderRounds = [
  {
    round: 1,
    title: "The Water Reactivity Ladder",
    instruction: "Climb from the metal that reacts violently with cold water to the one that only reacts with steam!",
    rungs: [
      { id: "r1", prompt: "Reacts vigorously with cold water, catches fire (K or Na)", answer: "Na", symbol: "Sodium" },
      { id: "r2", prompt: "Reacts with cold water less violently; floats on surface", answer: "Ca", symbol: "Calcium" },
      { id: "r3", prompt: "Does not react with cold water, reacts with hot water and floats", answer: "Mg", symbol: "Magnesium" },
      { id: "r4", prompt: "Does not react with cold/hot water, but reacts with steam to form Fe₃O₄", answer: "Fe", symbol: "Iron" }
    ],
    boardNote: "Order of water reactivity: Na > Ca > Mg > Fe. Ca and Mg float because hydrogen bubbles adhere to their surfaces."
  },
  {
    round: 2,
    title: "Displacement Showdown",
    instruction: "Order these 4 metals in decreasing reactivity based on displacement reactions!",
    rungs: [
      { id: "d1", prompt: "Displaces Fe, Zn and Cu from their sulphate solutions", answer: "Al", symbol: "Aluminium" },
      { id: "d2", prompt: "Displaces Fe and Cu, but is displaced by Al", answer: "Zn", symbol: "Zinc" },
      { id: "d3", prompt: "Displaces Cu from blue CuSO₄ turning it green, but cannot displace Zn", answer: "Fe", symbol: "Iron" },
      { id: "d4", prompt: "Cannot displace Fe, Zn or Al from their salt solutions", answer: "Cu", symbol: "Copper" }
    ],
    boardNote: "Displacement order: Al > Zn > Fe > Cu. A more reactive metal displaces a less reactive metal from its salt solution."
  },
  {
    round: 3,
    title: "Metallurgical Extraction Hierarchy",
    instruction: "Climb the ladder from the metal extracted by thermal reduction to the metal extracted by electrolysis!",
    rungs: [
      { id: "m1", prompt: "Extracted by heating cinnabar ore alone (thermal reduction)", answer: "Hg", symbol: "Mercury" },
      { id: "m2", prompt: "Extracted from sulphide ore by roasting followed by self-reduction", answer: "Cu", symbol: "Copper" },
      { id: "m3", prompt: "Extracted by calcination of calamine ore followed by carbon reduction", answer: "Zn", symbol: "Zinc" },
      { id: "m4", prompt: "Extracted strictly by electrolytic reduction of its molten chloride", answer: "Na", symbol: "Sodium" }
    ],
    boardNote: "Top metals (Na) require electrolysis. Middle metals (Zn) use carbon reduction. Low metals (Hg, Cu) are extracted by heating alone."
  }
];
