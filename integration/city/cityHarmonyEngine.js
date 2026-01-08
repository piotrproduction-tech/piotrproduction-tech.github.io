
export const CityHarmonyEngine = {
  tick(city) {
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    city.harmony = {
      index: Number((cohesion - conflict).toFixed(2)),
      stable: cohesion > conflict
    };

    return city;
  }
};
