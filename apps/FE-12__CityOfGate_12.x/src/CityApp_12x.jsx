import React, { useEffect, useState } from "react";
import CityMapView from "./views/CityMapView.jsx";
import { initDistrictEngine } from "../../DistrictEngine_12.x/engine.js";
import { initCityCore } from "../../CityCore_12.x/index.js";
import { eventBus } from "../../DistrictEngine_12.x/eventBus.js";
import { Layout } from "./ui/Layout.jsx";

// VALIDATOR — sprawdza, czy FE i DE używają tego samego eventBus
import { eventBus as FE_eventBus } from "../../DistrictEngine_12.x/eventBus.js";
import { eventBus as DE_eventBus } from "../../DistrictEngine_12.x/eventBus.js";

if (FE_eventBus !== DE_eventBus) {
  console.error("❌ VALIDATOR: FE i DistrictEngine używają różnych eventBus!");
} else {
  console.log("✅ VALIDATOR: FE i DistrictEngine używają tego samego eventBus.");
}

import "./styles.css";

export function CityApp12x() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeView, setActiveView] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  const [pulse, setPulse] = useState(null);
  const [memory, setMemory] = useState(null);
  const [ai, setAI] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [narrative, setNarrative] = useState(null);
  const [rhythm, setRhythm] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [economy, setEconomy] = useState(null);
  const [governance, setGovernance] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [sync, setSync] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [broadcast, setBroadcast] = useState(null);

  useEffect(() => {
    console.log("🚀 FE‑12__CityOfGate_12.x: initializing CityCore…");

    // ⭐ 1. SUBSKRYPCJE — MUSZĄ BYĆ PRZED startem silników
    const onMenuItems = (items) => setMenuItems(items || []);
    const onViewShow = ({ view }) => setActiveView(view);
    const onPanelShow = ({ panelId }) => setActivePanel(panelId);
    const onPanelHide = () => setActivePanel(null);

    const onPulseInit = (p) => setPulse(p);
    const onMemoryInit = (m) => setMemory(m);
    const onAIInit = (a) => setAI(a);
    const onHeatmapInit = (h) => setHeatmap(h);
    const onNarrativeInit = (n) => setNarrative(n);
    const onRhythmInit = (r) => setRhythm(r);
    const onPersonalityInit = (p) => setPersonality(p);
    const onEconomyInit = (e) => setEconomy(e);
    const onGovernanceInit = (g) => setGovernance(g);
    const onSimulationInit = (s) => setSimulation(s);
    const onSyncInit = (s) => setSync(s);
    const onMapInit = (m) => setMapData(m);
    const onBroadcastInit = (b) => setBroadcast(b);

    // ⭐ REJESTRACJA LISTENERÓW
    eventBus.on("ui:menu:items", onMenuItems);
    eventBus.on("ui:view:show", onViewShow);
    eventBus.on("ui:panel:show", onPanelShow);
    eventBus.on("ui:panel:hide", onPanelHide);

    eventBus.on("city:pulse:init", onPulseInit);
    eventBus.on("city:memory:init", onMemoryInit);
    eventBus.on("city:ai:init", onAIInit);
    eventBus.on("city:heatmap:init", onHeatmapInit);
    eventBus.on("city:narrative:init", onNarrativeInit);
    eventBus.on("city:rhythm:init", onRhythmInit);
    eventBus.on("city:personality:init", onPersonalityInit);
    eventBus.on("city:economy:init", onEconomyInit);
    eventBus.on("city:governance:init", onGovernanceInit);
    eventBus.on("city:simulation:init", onSimulationInit);
    eventBus.on("city:sync:init", onSyncInit);
    eventBus.on("city:map:init", onMapInit);
    eventBus.on("city:broadcast:init", onBroadcastInit);

    // ⭐ 2. START SILNIKÓW — dopiero po subskrypcjach
    initCityCore();
    initDistrictEngine();

    // ⭐ 3. CLEANUP
    return () => {
      eventBus.off("ui:menu:items", onMenuItems);
      eventBus.off("ui:view:show", onViewShow);
      eventBus.off("ui:panel:show", onPanelShow);
      eventBus.off("ui:panel:hide", onPanelHide);

      eventBus.off("city:pulse:init", onPulseInit);
      eventBus.off("city:memory:init", onMemoryInit);
      eventBus.off("city:ai:init", onAIInit);
      eventBus.off("city:heatmap:init", onHeatmapInit);
      eventBus.off("city:narrative:init", onNarrativeInit);
      eventBus.off("city:rhythm:init", onRhythmInit);
      eventBus.off("city:personality:init", onPersonalityInit);
      eventBus.off("city:economy:init", onEconomyInit);
      eventBus.off("city:governance:init", onGovernanceInit);
      eventBus.off("city:simulation:init", onSimulationInit);
      eventBus.off("city:sync:init", onSyncInit);
      eventBus.off("city:map:init", onMapInit);
      eventBus.off("city:broadcast:init", onBroadcastInit);
    };
  }, []);

  // ⭐ HANDLERY UI
  const handleMenuClick = (id) => eventBus.emit("ui:menu:click", id);
  const handleOpenPanel = (panelId) => eventBus.emit("ui:panel:open", panelId);
  const handleClosePanel = () => eventBus.emit("ui:panel:close");

  return (
    <Layout
      menuItems={menuItems}
      onMenuClick={handleMenuClick}
      activeView={activeView}
      activePanel={activePanel}
      onOpenPanel={handleOpenPanel}
      onClosePanel={handleClosePanel}
      heartbeat={{
        pulse,
        memory,
        ai,
        heatmap,
        narrative,
        rhythm,
        personality,
        economy,
        governance,
        simulation,
        sync,
        mapData,
        broadcast
      }}
    />
  );
}
