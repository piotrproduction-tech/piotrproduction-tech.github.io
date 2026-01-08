
export const CityCulturalWavesEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const harmony = city.harmony?.index ?? 0;

    let wave = "Calm";

    if (mood > 70) wave = "Vibrant";
    if (harmony > 0.7) wave = "Unified";
    if (mood < 30) wave = "Introspective";

    city.culturalWave = wave;
    return city;
  }
};
