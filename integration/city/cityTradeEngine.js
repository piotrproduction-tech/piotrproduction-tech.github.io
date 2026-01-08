
export const CityTradeEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";

    let goods = ["Basic Goods"];
    if (archetype === "FESTIWAL") goods = ["Light Tokens", "Festival Artifacts"];
    if (archetype === "AGORA") goods = ["Social Services", "Reputation Contracts"];
    if (archetype === "LABIRYNT") goods = ["Trial Relics", "Transformation Shards"];
    if (archetype === "CYTADELA") goods = ["Echo Artifacts", "Memory Crystals"];

    city.trade = {
      goods,
      volume: Number((goods.length * 1.5).toFixed(2))
    };

    return city;
  }
};
