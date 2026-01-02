export default function CityMapView() { return "City Map"; }
// FE‑21 glow integration
import { cityMapGlow } from "../map/cityMapGlow";

export function MarketplaceGlow() {
  const glow = cityMapGlow["FE-21"];

  if (!glow || !glow.active) return null;

  return (
    <div className="district-glow" style={{
      boxShadow: `0 0 ${20 * glow.intensity}px #ffb347`,
      borderRadius: "12px",
      position: "absolute",
      width: "120px",
      height: "120px",
      left: "200px",
      top: "150px"
    }}>
    </div>
  );
}
import CityHeatmapOverlay from "./CityHeatmapOverlay";

export function CityMapWithHeatmap() {
  return (
    <div className="city-map-with-heatmap">
      <CityHeatmapOverlay />
    </div>
  );
}
import CityPulseOverlay from "./CityPulseOverlay";

export function CityMapWithPulse() {
  return (
    <div className="city-map-with-pulse">
      <CityPulseOverlay />
    </div>
  );
}
import CityMoodOverlay from "./CityMoodOverlay";

export function CityMapWithMood() {
  return (
    <div className="city-map-with-mood">
      <CityMoodOverlay />
    </div>
  );
}
import CityWeatherOverlay from "./CityWeatherOverlay";

export function CityMapWithWeather() {
  return (
    <div className="city-map-with-weather">
      <CityWeatherOverlay />
    </div>
  );
}
import CityRhythmOverlay from "./CityRhythmOverlay";

export function CityMapWithRhythm() {
  return (
    <div className="city-map-with-rhythm">
      <CityRhythmOverlay />
    </div>
  );
}
import { useEffect, useState } from "react";
import { citySync } from "../sync/citySyncEngine";

export function CitySyncStatus() {
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    citySync.subscribe(event => setLastEvent(event));
  }, []);

  if (!lastEvent) return null;

  return (
    <div className="city-sync-status" style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      padding: "10px 14px",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      borderRadius: "8px",
      fontSize: "12px"
    }}>
      Sync: {lastEvent.type}
    </div>
  );
}
import CityBroadcastOverlay from "./CityBroadcastOverlay";

export function CityMapWithBroadcast() {
  return (
    <div className="city-map-with-broadcast">
      <CityBroadcastOverlay />
    </div>
  );
}
import CityMemoryOverlay from "./CityMemoryOverlay";

export function CityMapWithMemory() {
  return (
    <div className="city-map-with-memory">
      <CityMemoryOverlay />
    </div>
  );
}
import CityAIOverlay from "./CityAIOverlay";

export function CityMapWithAI() {
  return (
    <div className="city-map-with-ai">
      <CityAIOverlay />
    </div>
  );
}
import CityPersonalityOverlay from "./CityPersonalityOverlay";

export function CityMapWithPersonality() {
  return (
    <div className="city-map-with-personality">
      <CityPersonalityOverlay />
    </div>
  );
}
import CityNarrativeOverlay from "./CityNarrativeOverlay";

export function CityMapWithNarrative() {
  return (
    <div className="city-map-with-narrative">
      <CityNarrativeOverlay />
    </div>
  );
}
import CityEconomyOverlay from "./CityEconomyOverlay";

export function CityMapWithEconomy() {
  return (
    <div className="city-map-with-economy">
      <CityEconomyOverlay />
    </div>
  );
}
import CityReputationOverlay from "./CityReputationOverlay";

export function CityMapWithReputation() {
  return (
    <div className="city-map-with-reputation">
      <CityReputationOverlay />
    </div>
  );
}
import CityGovernanceOverlay from "./CityGovernanceOverlay";

export function CityMapWithGovernance() {
  return (
    <div className="city-map-with-governance">
      <CityGovernanceOverlay />
    </div>
  );
}
import CitySimulationOverlay from "./CitySimulationOverlay";

export function CityMapWithSimulation() {
  return (
    <div className="city-map-with-simulation">
      <CitySimulationOverlay />
    </div>
  );
}
import CityEmergenceOverlay from "./CityEmergenceOverlay";

export function CityMapWithEmergence() {
  return (
    <div className="city-map-with-emergence">
      <CityEmergenceOverlay />
    </div>
  );
}