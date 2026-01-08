
export const CityCultureEngine = {
  tick(city, world) {
    city.culture = {
      festivalIntensity: world.events / 100,
      socialHarmony: world.social.trust,
      chaosFactor: world.social.tension
    };
    return city;
  }
};
