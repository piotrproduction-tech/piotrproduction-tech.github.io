
export const CitySocialNetworkEngine = {
  tick(city, world) {
    const trust = world.social.trust ?? 0;
    const tension = world.social.tension ?? 0;

    city.socialNetwork = {
      cohesion: Number((trust * 0.8).toFixed(2)),
      fragmentation: Number((tension * 0.7).toFixed(2)),
      pulse: Number(((trust - tension) / 2).toFixed(2))
    };

    return city;
  }
};
