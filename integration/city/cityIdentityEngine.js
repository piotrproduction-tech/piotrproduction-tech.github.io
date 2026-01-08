
export const CityIdentityEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    if (joy > anxiety && mood > 50) city.archetype = "CELEBRATION_CITY";
    else if (anxiety > joy) city.archetype = "ANXIOUS_CITY";
    else city.archetype = "NEUTRAL_CITY";

    return city;
  }
};
