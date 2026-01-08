// apps/FE-12__CityOfGate_12.x/src/engineMock.js
// Prosty mock DistrictEngine na potrzeby generatorów UI 12.x

export function getPanels() {
  return [
    { id: "district-info", title: "District Info" },
    { id: "economy", title: "Economy" },
    { id: "governance", title: "Governance" },
  ];
}

export function getMenuItems() {
  return [
    { id: "map", label: "City Map" },
    { id: "districts", label: "Districts" },
    { id: "heartbeat", label: "Heartbeat" },
  ];
}

export function getMapLayers() {
  return [
    { id: "districts", type: "polygon" },
    { id: "roads", type: "line" },
    { id: "nodes", type: "point" },
  ];
}

export function getOverlayList() {
  return [
    "CityHeatmapOverlay",
    "CityPulseOverlay",
    "CityMoodOverlay",
    "CityWeatherOverlay",
    "CityRhythmOverlay",
    "CityBroadcastOverlay",
    "CityMemoryOverlay",
    "CityAIOverlay",
    "CityPersonalityOverlay",
    "CityNarrativeOverlay",
    "CityEconomyOverlay",
    "CityReputationOverlay",
    "CityGovernanceOverlay",
    "CitySimulationOverlay",
    "CityEmergenceOverlay",
  ];
}

const engineMock = {
  getPanels,
  getMenuItems,
  getMapLayers,
  getOverlayList,
};

export default engineMock;
