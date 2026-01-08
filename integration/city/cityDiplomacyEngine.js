
export const CityDiplomacyEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const cycle = city.macroEconomy?.cycle ?? "Stable";

    let stance = "Neutral";

    if (archetype === "FESTIWAL") stance = "Cultural Outreach";
    if (archetype === "AGORA") stance = "Cooperation";
    if (archetype === "LABIRYNT") stance = "Strategic Isolation";
    if (archetype === "CYTADELA") stance = "Memory Exchange";

    if (cycle === "Recession") stance = "Seek Alliances";

    city.diplomacy = {
      stance
    };

    return city;
  }
};
