
export const CityMemoryGraphEngine = {
  graph: [],
  tick(city, world) {
    this.graph.push({
      timestamp: Date.now(),
      mood: city.cityMood,
      events: world.events,
      archetype: city.archetype
    });
    if (this.graph.length > 5000) this.graph.shift();
    city.memoryGraphSize = this.graph.length;
    return city;
  }
};
