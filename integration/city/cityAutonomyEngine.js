
export const CityAutonomyEngine = {
  tick(city, world) {
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    let decision = "Observe";

    if (cohesion > 0.6) decision = "Empower Community";
    if (conflict > 0.5) decision = "Stabilize Districts";
    if (city.law?.doctrine === "Law of Light") decision = "Initiate Festival Cycle";
    if (city.law?.doctrine === "Law of Trials") decision = "Begin Transformation Rites";

    city.autonomy = {
      decision,
      authority: Number((cohesion - conflict).toFixed(2))
    };

    return city;
  }
};
