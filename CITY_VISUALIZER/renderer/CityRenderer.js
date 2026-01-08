class CityRenderer {
    constructor({ districtRenderer, overlayRenderer, highlightRenderer, animationEngine }) {
        this.districtRenderer = districtRenderer;
        this.overlayRenderer = overlayRenderer;
        this.highlightRenderer = highlightRenderer;
        this.animationEngine = animationEngine;
    }

    render(cityState) {
        this.districtRenderer.render(cityState.districts);
        this.overlayRenderer.render(cityState.overlays);
        this.highlightRenderer.render(cityState.highlights);
        this.animationEngine.tick();
    }
}
module.exports = CityRenderer;
