
export const CityArtEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const mood = city.cityMood ?? 0;

    let era = "Neutral Expression";

    if (archetype === "FESTIWAL") era = "Era of Radiant Light";
    if (archetype === "AGORA") era = "Era of Geometric Harmony";
    if (archetype === "LABIRYNT") era = "Era of Shadow Forms";
    if (archetype === "CYTADELA") era = "Era of Echo Abstraction";

    if (mood > 80) era += " — High Energy";
    if (mood < 20) era += " — Minimal Phase";

    city.art = { era };
    return city;
  }
};
