
export const CityCollectiveMemoryEngine = {
  memory: [],
  tick(city, world) {
    const entry = {
      timestamp: Date.now(),
      archetype: city.archetype,
      mood: city.cityMood,
      events: world.events
    };

    this.memory.push(entry);
    if (this.memory.length > 2000) this.memory.shift();

    city.collectiveMemorySize = this.memory.length;
    return city;
  }
};
