export class ScenarioEventAdapter {
  constructor({ stateView, controller }) {
    this.stateView = stateView;
    this.controller = controller;
  }

  handle(event) {
    switch (event.type) {
      case "SHOW_OVERLAY":
        this.controller?.showOverlay?.(event.name);
        break;

      case "HIGHLIGHT_DISTRICT":
        this.controller?.highlightDistrict?.(event.name);
        break;

      case "SHOW_MESSAGE":
        this.controller?.showMessage?.(event.text);
        break;

      default:
        break;
    }
  }
}
