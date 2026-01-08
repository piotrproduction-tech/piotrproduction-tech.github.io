
export const CityMigrationEngine = {
  tick(city) {
    const harmony = city.harmony?.index ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    const flow = Number((harmony - conflict).toFixed(2));

    city.migration = {
      inflow: flow > 0 ? flow : 0,
      outflow: flow < 0 ? Math.abs(flow) : 0
    };

    return city;
  }
};
