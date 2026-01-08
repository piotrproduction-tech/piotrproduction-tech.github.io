// modules/generateCityVisualizer.js
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(process.cwd(), "CITY_VISUALIZER");

const structure = {
  renderer: {
    "CityRenderer.js": `class CityRenderer {
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
`,
    "DistrictRenderer.js": `class DistrictRenderer {
    render(districts = []) {
        // TODO: implement district rendering
    }
}
module.exports = DistrictRenderer;
`,
    "OverlayRenderer.js": `class OverlayRenderer {
    render(overlays = []) {
        // TODO: implement overlay rendering
    }
}
module.exports = OverlayRenderer;
`,
    "HighlightRenderer.js": `class HighlightRenderer {
    render(highlights = []) {
        // TODO: implement highlight rendering
    }
}
module.exports = HighlightRenderer;
`,
    "AnimationEngine.js": `class AnimationEngine {
    constructor() {
        this.animations = [];
    }

    add(animation) {
        this.animations.push(animation);
    }

    tick() {
        this.animations.forEach((a) => a.update && a.update());
    }
}
module.exports = AnimationEngine;
`,
  },

  state: {
    "CityStateView.js": `class CityStateView {
    constructor({ mapper, cache }) {
        this.mapper = mapper;
        this.cache = cache;
    }

    update(rawState) {
        const mapped = this.mapper.map(rawState);
        this.cache.set(mapped);
        return mapped;
    }

    get() {
        return this.cache.get();
    }
}
module.exports = CityStateView;
`,
    "CityStateMapper.js": `class CityStateMapper {
    map(rawState) {
        return {
            districts: rawState.districts || [],
            overlays: rawState.overlays || [],
            highlights: rawState.highlights || [],
            meta: rawState.meta || {}
        };
    }
}
module.exports = CityStateMapper;
`,
    "CityStateCache.js": `class CityStateCache {
    constructor() {
        this.state = null;
    }

    set(state) {
        this.state = state;
    }

    get() {
        return this.state;
    }
}
module.exports = CityStateCache;
`,
  },

  ui: {
    "OverlayUI.js": `class OverlayUI {
    show(overlay) {}
    hide(overlayId) {}
}
module.exports = OverlayUI;
`,
    "TooltipUI.js": `class TooltipUI {
    show(message, position) {}
    hide() {}
}
module.exports = TooltipUI;
`,
    "MessageUI.js": `class MessageUI {
    show(message, options = {}) {}
    clear() {}
}
module.exports = MessageUI;
`,
    "ContextPanelUI.js": `class ContextPanelUI {
    open(context) {}
    close() {}
}
module.exports = ContextPanelUI;
`,
    "TransitionUI.js": `class TransitionUI {
    play(transition) {}
}
module.exports = TransitionUI;
`,
  },

  events: {
    "CityEventAdapter.js": `class CityEventAdapter {
    constructor({ stateView }) {
        this.stateView = stateView;
    }

    handle(event) {
        // TODO: map CITY ENGINE events to visual state
    }
}
module.exports = CityEventAdapter;
`,
    "FestivalEventAdapter.js": `class FestivalEventAdapter {
    constructor({ stateView }) {
        this.stateView = stateView;
    }

    handle(event) {
        // TODO: map FESTIVAL ENGINE events to visual state
    }
}
module.exports = FestivalEventAdapter;
`,
    "ScenarioEventAdapter.js": `class ScenarioEventAdapter {
    constructor({ stateView }) {
        this.stateView = stateView;
    }

    handle(event) {
        // TODO: map SCENARIO ENGINE events to visual state
    }
}
module.exports = ScenarioEventAdapter;
`,
  },

  controller: {
    "CityVisualizerController.js": `class CityVisualizerController {
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
`,
    "VisualPriorityEngine.js": `class VisualPriorityEngine {
    evaluate(event) {
        return event.priority || 0;
    }
}
module.exports = VisualPriorityEngine;
`,
    "VisualScheduler.js": `class VisualScheduler {
    constructor() {
        this.queue = [];
    }

    schedule(event, priority) {
        this.queue.push({ event, priority });
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    next() {
        return this.queue.shift();
    }
}
module.exports = VisualScheduler;
`,
  },
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log("SKIP (exists):", filePath);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("CREATE:", filePath);
}

function run() {
  console.log("=== Generating CITY_VISUALIZER layer ===");
  ensureDir(ROOT_DIR);

  Object.entries(structure).forEach(([folder, files]) => {
    const folderPath = path.join(ROOT_DIR, folder);
    ensureDir(folderPath);

    Object.entries(files).forEach(([fileName, content]) => {
      const filePath = path.join(folderPath, fileName);
      createFile(filePath, content);
    });
  });

  console.log("=== CITY_VISUALIZER generation complete ===");
}

run();
