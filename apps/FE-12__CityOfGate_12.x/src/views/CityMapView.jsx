import React from "react";
import { CityHeatmapOverlay } from "./CityHeatmapOverlay.jsx";
import { CityPulseOverlay } from "./CityPulseOverlay.jsx";
import { CityMoodOverlay } from "./CityMoodOverlay.jsx";
import { CityWeatherOverlay } from "./CityWeatherOverlay.jsx";
import { CityRhythmOverlay } from "./CityRhythmOverlay.jsx";
import { CityBroadcastOverlay } from "./CityBroadcastOverlay.jsx";
import { CityMemoryOverlay } from "./CityMemoryOverlay.jsx";
import { CityAIOverlay } from "./CityAIOverlay.jsx";
import { CityPersonalityOverlay } from "./CityPersonalityOverlay.jsx";
import { CityNarrativeOverlay } from "./CityNarrativeOverlay.jsx";
import { CityEconomyOverlay } from "./CityEconomyOverlay.jsx";
import { CityReputationOverlay } from "./CityReputationOverlay.jsx";
import { CityGovernanceOverlay } from "./CityGovernanceOverlay.jsx";
import { CitySimulationOverlay } from "./CitySimulationOverlay.jsx";
import { CityEmergenceOverlay } from "./CityEmergenceOverlay.jsx";

export default function CityMapView({ heartbeat }) {
  return (
    <div className="city-map-view">
      <CityHeatmapOverlay data={heartbeat.heatmap} />
      <CityPulseOverlay data={heartbeat.pulse} />
      <CityMoodOverlay data={heartbeat.mood} />
      <CityWeatherOverlay data={heartbeat.weather} />
      <CityRhythmOverlay data={heartbeat.rhythm} />
      <CityBroadcastOverlay data={heartbeat.broadcast} />
      <CityMemoryOverlay data={heartbeat.memory} />
      <CityAIOverlay data={heartbeat.ai} />
      <CityPersonalityOverlay data={heartbeat.personality} />
      <CityNarrativeOverlay data={heartbeat.narrative} />
      <CityEconomyOverlay data={heartbeat.economy} />
      <CityReputationOverlay data={heartbeat.reputation} />
      <CityGovernanceOverlay data={heartbeat.governance} />
      <CitySimulationOverlay data={heartbeat.simulation} />
      <CityEmergenceOverlay data={heartbeat.emergence} />
    </div>
  );
}
