// views/MainView.js

import { renderPlaceholderCard } from "../components/PlaceholderCard.js";

export function createViews({ engine, store, eventBus, panels, config }) {
  let lastSnapshot = store.getSnapshot();
  let lastImmersive = panels.getImmersiveState();

  // 🔥 LIVE UPDATE — widok reaguje na heartbeat i init
  eventBus.on("engine:tick", () => {
    lastSnapshot = store.getSnapshot();
    lastImmersive = panels.getImmersiveState();
  });

  eventBus.on("engine:init", () => {
    lastSnapshot = store.getSnapshot();
    lastImmersive = panels.getImmersiveState();
  });

  eventBus.on("engine:destroy", () => {
    lastSnapshot = {};
    lastImmersive = {};
  });

  // 🔥 MAIN VIEW — pełna integracja z panelem immersive
  function renderMain(user) {
    return {
      view: "MainView",
      user,
      engine: engine.getState(),
      snapshot: lastSnapshot,
      immersive: lastImmersive,
      card: renderPlaceholderCard({
        title: `Welcome to ${config?.name || "District"}`,
        body: "This district is alive and driven by the City Engine 12.x lifecycle."
      })
    };
  }

  // 🔥 LIVE VIEW — dynamiczny snapshot
  function renderLive(user) {
    return {
      view: "LiveView",
      user,
      engine: engine.getState(),
      snapshot: lastSnapshot,
      immersive: lastImmersive
    };
  }

  // 🔥 DASHBOARD VIEW — pełny stan districtu
  function renderDashboard(user) {
    return {
      view: "DashboardView",
      user,
      engine: engine.getState(),
      snapshot: lastSnapshot,
      immersive: lastImmersive
    };
  }

  return {
    renderMain,
    renderLive,
    renderDashboard
  };
}

// 🔥 TEST MODE — minimalne stuby
export function createViewsForTests() {
  return {
    renderMain: () => ({ view: "MainView" }),
    renderLive: () => ({ view: "LiveView" }),
    renderDashboard: () => ({ view: "DashboardView" })
  };
}
