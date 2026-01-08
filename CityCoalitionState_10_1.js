// CityCoalitionState_10_1
// Prosty model koalicji miasta na bazie relacji dzielnic.

export class CityCoalitionState_10_1 {
  constructor() {
    this.relations = {};   // surowe relacje
    this.coalitions = {};  // faktyczne koalicje
  }

  updateFromDistrictSnapshot(districtName, snapshot) {
    const relations = snapshot.relations || {};

    Object.entries(relations).forEach(([target, val]) => {
      const key = [districtName, target].sort().join("__");

      // --- aktualizacja relacji ---
      if (!this.relations[key]) this.relations[key] = 0;
      this.relations[key] = Math.max(
        -1,
        Math.min(1, this.relations[key] + val)
      );

      // --- tworzenie koalicji ---
      if (this.relations[key] > 0.1) {
        this.coalitions[key] = true;
      } else {
        delete this.coalitions[key];
      }
    });
  }

  snapshot() {
    return { ...this.coalitions };
  }
}
