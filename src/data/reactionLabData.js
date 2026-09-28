/**
 * Reaction Lab & Category Sorter Data (SciChamp & Wordwall style)
 * Drag-and-drop matching and sorting game challenges.
 */

export const sortingChallenges = [
  {
    id: "sort-water-reactivity",
    title: "Water Reactivity Sorting Arena",
    instruction: "Drag each element tile into the correct beaker category based on its reaction with water!",
    categories: [
      { id: "cat-cold", label: "Cold Water", badge: "Violent / Floats" },
      { id: "cat-hot", label: "Hot Water Only", badge: "Magnesium" },
      { id: "cat-steam", label: "Steam Only", badge: "Oxide + H₂" },
      { id: "cat-none", label: "No Reaction", badge: "Inert to Water" }
    ],
    items: [
      { id: "w-na", text: "Sodium (Na)", category: "cat-cold", hint: "Reacts violently; hydrogen catches fire immediately." },
      { id: "w-k", text: "Potassium (K)", category: "cat-cold", hint: "Vigorous exothermic reaction; lilac flame." },
      { id: "w-ca", text: "Calcium (Ca)", category: "cat-cold", hint: "Less violent; starts floating as H₂ bubbles stick." },
      { id: "w-mg", text: "Magnesium (Mg)", category: "cat-hot", hint: "Does NOT react with cold water; reacts with hot water and floats." },
      { id: "w-al", text: "Aluminium (Al)", category: "cat-steam", hint: "Forms protective oxide, reacts only with steam (2Al + 3H₂O → Al₂O₃ + 3H₂)." },
      { id: "w-fe", text: "Iron (Fe)", category: "cat-steam", hint: "Reacts with steam to form magnetic iron oxide (Fe₃O₄)." },
      { id: "w-zn", text: "Zinc (Zn)", category: "cat-steam", hint: "Reacts with steam to form ZnO and H₂." },
      { id: "w-cu", text: "Copper (Cu)", category: "cat-none", hint: "Does not react with cold water, hot water, or steam." },
      { id: "w-au", text: "Gold (Au)", category: "cat-none", hint: "Noble metal at the bottom of the activity series." }
    ]
  },
  {
    id: "sort-metallurgy-process",
    title: "Metallurgy: Roasting vs Calcination vs Electrolysis",
    instruction: "Classify each ore or compound under its exact metallurgical extraction method!",
    categories: [
      { id: "cat-roast", label: "Roasting (Sulphide + Excess O₂)", badge: "Evolves SO₂" },
      { id: "cat-calc", label: "Calcination (Carbonate - No O₂)", badge: "Evolves CO₂" },
      { id: "cat-electro", label: "Electrolysis (Molten Salts)", badge: "Top Reactive Metals" }
    ],
    items: [
      { id: "m-zns", text: "Zinc Blende (ZnS)", category: "cat-roast", hint: "Sulphide ore heated in excess air." },
      { id: "m-cu2s", text: "Copper Glance (Cu₂S)", category: "cat-roast", hint: "Sulphide ore of copper; partially oxidised to Cu₂O." },
      { id: "m-hgs", text: "Cinnabar (HgS)", category: "cat-roast", hint: "Mercury sulphide heated in air to form HgO." },
      { id: "m-znco3", text: "Calamine Ore (ZnCO₃)", category: "cat-calc", hint: "Carbonate ore heated strongly in limited air." },
      { id: "m-caco3", text: "Limestone (CaCO₃)", category: "cat-calc", hint: "Decomposes into CaO + CO₂ on heating." },
      { id: "m-nacl", text: "Molten NaCl", category: "cat-electro", hint: "Sodium metal deposited at cathode, chlorine gas at anode." },
      { id: "m-al2o3", text: "Molten Alumina (Al₂O₃)", category: "cat-electro", hint: "High affinity for oxygen requires electrolytic reduction." }
    ]
  },
  {
    id: "sort-displacement-reactions",
    title: "Displacement Showdown: Reaction or No Reaction?",
    instruction: "Determine whether displacement occurs based on the Reactivity Series!",
    categories: [
      { id: "cat-react", label: "Displacement Occurs! ✅", badge: "More reactive displaces less" },
      { id: "cat-noreact", label: "No Reaction ❌", badge: "Less reactive cannot displace" }
    ],
    items: [
      { id: "d-fe-cuso4", text: "Iron Nail + CuSO₄ Solution", category: "cat-react", hint: "Fe displaces Cu: Blue solution turns greenish FeSO₄." },
      { id: "d-cu-feso4", text: "Copper Wire + FeSO₄ Solution", category: "cat-noreact", hint: "Copper is below iron in the activity series." },
      { id: "d-zn-cuso4", text: "Zinc Strip + CuSO₄ Solution", category: "cat-react", hint: "Zn displaces Cu: Blue color fades to colourless ZnSO₄." },
      { id: "d-cu-agno3", text: "Copper Strip + AgNO₃ Solution", category: "cat-react", hint: "Cu displaces Ag: Shining silver needle crystals deposit." },
      { id: "d-ag-cuso4", text: "Silver Coin + CuSO₄ Solution", category: "cat-noreact", hint: "Silver is less reactive than copper." }
    ]
  }
];
