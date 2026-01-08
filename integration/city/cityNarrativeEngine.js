
export const CityNarrativeEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const mood = city.cityMood ?? 0;

    city.story = `The city breathes as a ${archetype}, with mood level ${mood}.`;
    return city;
  }
};
