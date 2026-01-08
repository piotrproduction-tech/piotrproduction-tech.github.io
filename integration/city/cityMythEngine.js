
export const CityMythEngine = {
  tick(city, world) {
    const mood = city.cityMood ?? 0;
    const archetype = city.archetype ?? "UNKNOWN";

    let myth = "The Silent Streets";
    if (archetype === "FESTIWAL") myth = "The Birth of Light";
    if (archetype === "AGORA") myth = "The First Gathering";
    if (archetype === "LABIRYNT") myth = "The Trial of Shadows";
    if (archetype === "CYTADELA") myth = "The Walls of Echoes";

    city.myth = {
      name: myth,
      moodStamp: mood
    };

    return city;
  }
};
