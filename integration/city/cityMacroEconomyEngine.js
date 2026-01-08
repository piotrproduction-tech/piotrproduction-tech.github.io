
export const CityMacroEconomyEngine = {
  tick(city, world) {
    const mood = city.cityMood ?? 0;
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const memory = city.collectiveMemorySize ?? 0;

    const gdp = Number(((mood * 2 + cohesion * 3 + memory / 100) / 10).toFixed(2));

    let cycle = "Stable";
    if (gdp > 15) cycle = "Boom";
    if (gdp < 5) cycle = "Recession";

    city.macroEconomy = {
      gdp,
      cycle
    };

    return city;
  }
};
