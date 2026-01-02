export const cityHeatmap = {
  districts: {},
  update(districtId) {
    if (!this.districts[districtId]) {
      this.districts[districtId] = { intensity: 0, lastEvent: null };
    }

    const d = this.districts[districtId];
    d.intensity = Math.min(1, d.intensity + 0.25);
    d.lastEvent = Date.now();

    // decay
    setTimeout(() => {
      d.intensity = Math.max(0, d.intensity - 0.25);
    }, 3000);
  }
};