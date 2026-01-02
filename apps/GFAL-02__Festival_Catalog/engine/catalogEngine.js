export class CatalogEngine {
  constructor({ festivals }) {
    this.festivals = festivals; // array of FestivalSummary
  }

  filterFestivals(filters) {
    return this.festivals.filter(f => {
      if (filters.mode && f.mode !== filters.mode) return false;
      if (filters.visibility && f.visibility !== filters.visibility) return false;

      if (filters.dateFrom && new Date(f.startDate) < new Date(filters.dateFrom))
        return false;

      if (filters.dateTo && new Date(f.endDate) > new Date(filters.dateTo))
        return false;

      if (filters.search) {
        const text = filters.search.toLowerCase();
        const match =
          f.name.toLowerCase().includes(text) ||
          f.description.toLowerCase().includes(text);
        if (!match) return false;
      }

      return true;
    });
  }

  sortFestivals(by = "startDate") {
    return [...this.festivals].sort((a, b) => {
      if (by === "startDate") return new Date(a.startDate) - new Date(b.startDate);
      if (by === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }

  getPublicFestivals() {
    return this.festivals.filter(f => f.visibility === "public");
  }
}