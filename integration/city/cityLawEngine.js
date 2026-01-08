
export const CityLawEngine = {
  tick(city) {
    const virtue = city.ethics?.virtue ?? 0;
    const corruption = city.ethics?.corruption ?? 0;

    let doctrine = "Neutral Code";

    if (virtue > corruption) doctrine = "Law of Harmony";
    if (city.archetype === "FESTIWAL") doctrine = "Law of Light";
    if (city.archetype === "AGORA") doctrine = "Law of Agora";
    if (city.archetype === "LABIRYNT") doctrine = "Law of Trials";
    if (city.archetype === "CYTADELA") doctrine = "Law of Echoes";

    city.law = {
      doctrine,
      stability: Number((virtue - corruption).toFixed(2))
    };

    return city;
  }
};
