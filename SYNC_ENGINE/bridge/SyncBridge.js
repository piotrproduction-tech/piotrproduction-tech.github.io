export class SyncBridge {
  constructor({ cityAdapter, festivalAdapter, router }) {
    this.cityAdapter = cityAdapter;
    this.festivalAdapter = festivalAdapter;
    this.router = router;
  }

  sendToCity(event) {
    this.cityAdapter.send(event);
  }

  sendToFestival(event) {
    this.festivalAdapter.send(event);
  }

  route(event) {
    this.router.route(event);
  }
}
