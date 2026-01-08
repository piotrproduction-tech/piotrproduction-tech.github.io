
export const CityEmotionalWeatherEngine = {
  tick(city) {
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    const intensity = Math.abs(joy - anxiety) / 100;
    const front = joy > anxiety ? "HOPE_WAVE" : "ANXIETY_FRONT";

    city.emotionalWeather = {
      front,
      intensity: Number(intensity.toFixed(2)),
      stability: Number((1 - intensity).toFixed(2))
    };

    return city;
  }
};
