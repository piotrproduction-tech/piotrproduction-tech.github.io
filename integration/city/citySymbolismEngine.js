
export const CitySymbolismEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";

    let symbol = "Circle";

    if (archetype === "FESTIWAL") symbol = "Lantern";
    if (archetype === "AGORA") symbol = "Geometric Knot";
    if (archetype === "LABIRYNT") symbol = "Spiral Mask";
    if (archetype === "CYTADELA") symbol = "Echo Crystal";

    city.symbol = symbol;
    return city;
  }
};
