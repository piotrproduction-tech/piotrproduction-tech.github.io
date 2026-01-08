import { ScenarioEventAdapter } from "../CITY_VISUALIZER/events/ScenarioEventAdapter.js";

test("Visualizer adapter exists", () => {
    const adapter = new ScenarioEventAdapter({
  stateView: {},
  controller: {
    showOverlay: () => {},
    highlightDistrict: () => {},
    showMessage: () => {}
  }
});

    expect(adapter).toBeDefined();
});
