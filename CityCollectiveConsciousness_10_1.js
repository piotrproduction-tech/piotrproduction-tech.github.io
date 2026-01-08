// CityCollectiveConsciousness_10_1
// Kolektywna świadomość miasta — agreguje stany dzielnic.

export class CityCollectiveConsciousness_10_1 {
  constructor() {
    this.districtStates = {};
    this.globalState = {
      dominantCoalition: null,
      tensionLevel: 0,
      harmonyLevel: 0,
      lastUpdated: Date.now()
    };
  }

  updateDistrictState(districtName, snapshot) {
    this.districtStates[districtName] = snapshot;
    this.recalculate();
  }

  recalculate() {
    const names = Object.keys(this.districtStates);
    if (names.length === 0) return;

    let totalTension = 0;
    let totalHarmony = 0;
    let coalitionCounts = {};

    names.forEach(name => {
      const s = this.districtStates[name];
      if (!s) return;

      const tension = s.emergentState?.tension || 0;
      const hype = s.emergentState?.hypeLevel || 0;
      const relations = s.relations || {};

      totalTension += tension + hype;

      Object.entries(relations).forEach(([target, val]) => {
        if (!coalitionCounts[target]) coalitionCounts[target] = 0;
        if (val > 0.5) coalitionCounts[target] += 1;
      });
    });

    const avgTension = totalTension / names.length;
    const maxCoalition = Object.entries(coalitionCounts).sort((a, b) => b[1] - a[1])[0];

    this.globalState.tensionLevel = Math.min(1, avgTension);
    this.globalState.harmonyLevel = 1 - this.globalState.tensionLevel;
    this.globalState.dominantCoalition = maxCoalition ? maxCoalition[0] : null;
    this.globalState.lastUpdated = Date.now();
  }

  snapshot() {
    return {
      districts: this.districtStates,
      global: this.globalState
    };
  }
}
