
export const CityRitualEvolutionEngine = {
  tick(city) {
    const memory = city.collectiveMemorySize ?? 0;

    let ritual = "Silent Gathering";

    if (memory > 500) ritual = "Rite of Echo Resonance";
    if (memory > 1500) ritual = "Festival of Light and Shadow";
    if (memory > 3000) ritual = "Grand Hybrid Ceremony";

    city.ritual = { ritual };
    return city;
  }
};
