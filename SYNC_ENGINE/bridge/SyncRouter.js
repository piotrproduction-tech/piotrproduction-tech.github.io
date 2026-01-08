class SyncRouter {
    constructor({ cityAdapter, festivalAdapter }) {
        this.cityAdapter = cityAdapter;
        this.festivalAdapter = festivalAdapter;
    }

    route(event) {
        if (event.target === "CITY") {
            this.cityAdapter.send(event);
        } else if (event.target === "FESTIVAL") {
            this.festivalAdapter.send(event);
        }
    }
}
module.exports = SyncRouter;
