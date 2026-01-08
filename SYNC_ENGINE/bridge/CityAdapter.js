// SYNC_ENGINE/bridge/CityAdapter.js

class CityAdapter {
    constructor({ scenarioEventAdapter }) {
        this.scenarioEventAdapter = scenarioEventAdapter;
    }

    send(event) {
        if (!event || !event.type) return;

        switch (event.type) {
            case "AI_DIRECTOR_SCENARIO_STEP":
                this.handleScenarioEvent(event);
                break;

            default:
                // ignore unsupported events
                break;
        }
    }

    // [SCENARIO_INTEGRATION]
    handleScenarioEvent(event) {
        const visual = event.payload?.visual;
        if (!visual) return;

        if (visual.overlay) {
            this.scenarioEventAdapter.handle({
                type: "SHOW_OVERLAY",
                name: visual.overlay
            });
        }

        if (visual.highlight) {
            this.scenarioEventAdapter.handle({
                type: "HIGHLIGHT_DISTRICT",
                name: visual.highlight
            });
        }

        if (visual.message) {
            this.scenarioEventAdapter.handle({
                type: "SHOW_MESSAGE",
                text: visual.message
            });
        }
    }
}

module.exports = CityAdapter;
