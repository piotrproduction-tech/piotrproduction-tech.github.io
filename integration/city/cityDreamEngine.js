
export const CityDreamEngine = {
  tick(city, world) {
    const joy = city.emotions?.joy ?? 0;
    const excitement = city.emotions?.excitement ?? 0;
    const events = world.events ?? 0;

    const intensity = Number(((joy + excitement + events / 200) / 100).toFixed(2));

    let dream = "QUIET_STREETS";
    let symbol = "Empty plazas under soft lights";

    if (intensity > 0.3) {
      dream = "FESTIVAL_OF_LIGHTS";
      symbol = "Thousands dancing under lanterns";
    }
    if (intensity > 0.6) {
      dream = "GRAND_AGORA";
      symbol = "Crowds gathering in unity and celebration";
    }

    city.dream = {
      type: dream,
      intensity,
      symbol
    };

    return city;
  }
};
