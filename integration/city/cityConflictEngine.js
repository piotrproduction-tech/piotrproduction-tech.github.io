
export const CityConflictEngine = {
  tick(city, world) {
    const tension = world.social.tension ?? 0;
    const events = world.events ?? 0;

    city.conflict = {
      risk: Number((tension * 0.6 + events / 20000).toFixed(2)),
      active: tension > 0.5
    };

    return city;
  }
};
