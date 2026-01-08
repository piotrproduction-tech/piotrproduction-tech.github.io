class CityVisualizerController {
    constructor({ cityRenderer, stateView, uiLayer, priorityEngine, visualScheduler }) {
        this.cityRenderer = cityRenderer;
        this.stateView = stateView;
        this.uiLayer = uiLayer;
        this.priorityEngine = priorityEngine;
        this.visualScheduler = visualScheduler;
    }

    handleEvent(event) {
        const priority = this.priorityEngine.evaluate(event);
        this.visualScheduler.schedule(event, priority);
    }

    render() {
        const state = this.stateView.get();
        if (!state) return;
        this.cityRenderer.render(state);
    }
}
module.exports = CityVisualizerController;


// [SCENARIO_CONTROLLER_METHODS]
showOverlay(name) {
    this.overlayRenderer.show(name);
}

highlightDistrict(name) {
    this.highlightRenderer.highlight(name);
}

showMessage(text) {
    this.messageUI.show(text);
}