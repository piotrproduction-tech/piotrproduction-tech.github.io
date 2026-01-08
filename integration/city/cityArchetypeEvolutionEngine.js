
export const CityArchetypeEvolutionEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    if (joy > anxiety && mood > 80) city.archetype = "FESTIWAL";
    else if (anxiety > joy) city.archetype = "CYTADELA";
    else if (mood < 20) city.archetype = "LABIRYNT";
    else city.archetype = "AGORA";

    return city;
  }
};
