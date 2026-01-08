
export const CityLegendsEngine = {
  tick(city, world) {
    const rep = city.userReputation?.value ?? 0;
    const events = world.events ?? 0;

    let legend = "A wanderer walks the streets.";
    if (rep > 500) legend = "U1, the Bearer of Light.";
    if (events > 10000) legend = "The Echoes return once more.";

    city.legend = legend;
    return city;
  }
};
