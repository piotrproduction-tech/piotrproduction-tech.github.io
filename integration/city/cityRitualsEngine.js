
export const CityRitualsEngine = {
  tick(city, world) {
    const events = world.events;

    if (events % 5000 === 0) {
      city.ritual = {
        name: "Festival of Echoes",
        boost: {
          joy: 20,
          harmony: 10
        }
      };
      city.emotions.joy += 20;
    }

    return city;
  }
};
