export class FestivalFilters {
  constructor({ mode, visibility, dateFrom, dateTo, search }) {
    this.mode = mode; // optional
    this.visibility = visibility; // optional
    this.dateFrom = dateFrom; // optional
    this.dateTo = dateTo; // optional
    this.search = search; // optional text search
  }
}