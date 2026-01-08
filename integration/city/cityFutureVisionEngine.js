
export const CityFutureVisionEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const dream = city.dream?.type ?? "UNKNOWN";

    let vision = "The city rests.";
    if (mood > 80) vision = "A Great Festival approaches.";
    if (dream === "GRAND_AGORA") vision = "The Agora will rise again.";
    if (dream === "FESTIVAL_OF_LIGHTS") vision = "The Lantern Tide is coming.";

    city.futureVision = vision;
    return city;
  }
};
