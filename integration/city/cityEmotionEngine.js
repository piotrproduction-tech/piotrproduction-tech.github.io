
export const CityEmotionEngine = {
  tick(city, world) {
    const emotions = {
      joy: world.social.mood * 0.5,
      anxiety: (1 - world.social.trust) * 5,
      excitement: Math.min(world.events / 100, 50),
      fatigue: world.social.tension * 2,
      hope: city.userReputation?.value > 500 ? 20 : 0
    };
    const dominant = Object.entries(emotions).sort((a,b)=>b[1]-a[1])[0][0];
    city.emotions = emotions;
    city.emotionalState = dominant.toUpperCase();
    return city;
  }
};
