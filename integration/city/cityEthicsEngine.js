
export const CityEthicsEngine = {
  tick(city, world) {
    const harmony = city.harmony?.index ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    city.ethics = {
      virtue: Number((harmony * 0.7).toFixed(2)),
      corruption: Number((conflict * 0.6).toFixed(2)),
      balance: Number((harmony - conflict).toFixed(2))
    };

    return city;
  }
};
