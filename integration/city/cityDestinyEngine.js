
export const CityDestinyEngine = {
  tick(city) {
    const vision = city.futureVision ?? "The city rests.";
    const doctrine = city.law?.doctrine ?? "Neutral Code";

    let destiny = "Undefined Path";

    if (vision.includes("Festival")) destiny = "Era of Light";
    if (vision.includes("Agora")) destiny = "Era of Community";
    if (doctrine === "Law of Trials") destiny = "Era of Transformation";
    if (doctrine === "Law of Echoes") destiny = "Era of Resonance";

    city.destiny = destiny;
    return city;
  }
};
