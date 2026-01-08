import React from "react";

function MapPanel({ mapData }) {
  return (
    <div>
      <h3>Mapa miasta</h3>
      <pre>{JSON.stringify(mapData?.getCityTiles?.(), null, 2)}</pre>
    </div>
  );
}

function WalletPanel() {
  return (
    <div>
      <h3>Portfel</h3>
      <p>Tu pojawi się logika portfela użytkownika.</p>
    </div>
  );
}

function ReputationPanel({ memory }) {
  return (
    <div>
      <h3>Reputacja</h3>
      <pre>{JSON.stringify(memory?.events?.slice(-10), null, 2)}</pre>
    </div>
  );
}

const PANEL_COMPONENTS = {
  CityMapPanel: MapPanel,
  WalletPanel: WalletPanel,
  ReputationPanel: ReputationPanel
};

export function Panels({ activePanel, onClose, heartbeat }) {
  if (!activePanel) {
    return (
      <div className="city-panel-empty">
        <p>Brak aktywnego panelu.</p>
      </div>
    );
  }

  const PanelComponent = PANEL_COMPONENTS[activePanel];

  return (
    <div className="city-panel">
      <div className="city-panel-header">
        <h2>{activePanel}</h2>
        <button onClick={onClose} className="city-panel-close">
          ×
        </button>
      </div>

      <div className="city-panel-body">
        {PanelComponent ? (
          <PanelComponent {...heartbeat} />
        ) : (
          <p>
            Panel <strong>{activePanel}</strong> nie ma jeszcze implementacji.
          </p>
        )}
      </div>
    </div>
  );
}
