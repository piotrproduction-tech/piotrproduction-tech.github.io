import React from "react";
import { Menu } from "./Menu.jsx";
import { Views } from "./Views.jsx";
import { Panels } from "./Panels.jsx";
import CityMapView from "../views/CityMapView.jsx";

export function Layout({
  menuItems,
  onMenuClick,
  activeView,
  activePanel,
  onOpenPanel,
  onClosePanel,
  heartbeat
}) {
  return (
    <div className="city-root">
      <header className="city-header">
        <h1>CITYOF‑GATE 12.x</h1>
        <p>Żyjące miasto. Puls, rytm, osobowość, narracja.</p>
        <div className="city-heartbeat">
          <span className="city-heartbeat-label">BPM:</span>
          <span className="city-heartbeat-value">
            {heartbeat.pulse?.bpm ?? "—"}
          </span>
          <span className="city-heartbeat-label">Personality:</span>
          <span className="city-heartbeat-value">
            {heartbeat.personality?.personality ?? "—"}
          </span>
          <span className="city-heartbeat-dot pulse-active">●</span>
        </div>
      </header>

      <div className="city-layout">
        <Menu
          items={menuItems}
          onMenuClick={onMenuClick}
          activeView={activeView}
        />

        <div className="city-view-wrapper">
          <Views
            activeView={activeView}
            onOpenPanel={onOpenPanel}
            heartbeat={heartbeat}
          />
        </div>

        <div className="city-panels-wrapper">
          <Panels
            activePanel={activePanel}
            onClose={onClosePanel}
            heartbeat={heartbeat}
          />
        </div>
      </div>
    </div>
  );
}
