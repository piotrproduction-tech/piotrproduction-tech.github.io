import React from "react";
import CityMapView from "../views/CityMapView.jsx";
import { HeartbeatView } from "../views/HeartbeatView.jsx";

function MapView({ mapData, onOpenPanel }) {
  return (
    <div className="city-view-card">
      <h2>Mapa miasta</h2>
      <pre>{JSON.stringify(mapData?.getCityTiles?.(), null, 2)}</pre>
      <button onClick={() => onOpenPanel("CityMapPanel")}>
        Otwórz panel mapy
      </button>
    </div>
  );
}

function AIView({ ai, personality }) {
  return (
    <div className="city-view-card">
      <h2>AI miasta</h2>
      <p>Osobowość: {personality?.personality}</p>
      <pre>{JSON.stringify(ai, null, 2)}</pre>
    </div>
  );
}

function HeatmapView({ heatmap }) {
  return (
    <div className="city-view-card">
      <h2>Heatmapa aktywności</h2>
      <pre>{JSON.stringify(heatmap?.districts, null, 2)}</pre>
    </div>
  );
}

function EconomyView({ economy }) {
  return (
    <div className="city-view-card">
      <h2>Ekonomia miasta</h2>
      <pre>{JSON.stringify(economy, null, 2)}</pre>
    </div>
  );
}

const VIEW_COMPONENTS = {
  map: MapView,
  ai: AIView,
  heatmap: HeatmapView,
  economy: EconomyView,
  heartbeat: HeartbeatView
};

export function Views({ activeView, onOpenPanel, heartbeat }) {
  if (!activeView) {
    return (
      <div className="city-view-empty">
        <p>Wybierz widok z menu po lewej.</p>
      </div>
    );
  }

  const ViewComponent = VIEW_COMPONENTS[activeView];

  return (
    <div className="city-view">
      {ViewComponent ? (
        <ViewComponent
          mapData={heartbeat.mapData}
          ai={heartbeat.ai}
          personality={heartbeat.personality}
          heatmap={heartbeat.heatmap}
          economy={heartbeat.economy}
          governance={heartbeat.governance}
          memory={heartbeat.memory}
          broadcast={heartbeat.broadcast}
          simulation={heartbeat.simulation}
          pulse={heartbeat.pulse}
          rhythm={heartbeat.rhythm}
          onOpenPanel={onOpenPanel}
        />
      ) : (
        <div className="city-view-card">
          <h2>Widok: {activeView}</h2>
          <p>Widok nie ma jeszcze dedykowanego komponentu.</p>
        </div>
      )}
    </div>
  );
}
