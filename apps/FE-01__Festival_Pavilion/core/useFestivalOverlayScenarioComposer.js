


// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_HOOK
// GUI editor for building overlay scenarios

import { useState } from "react";

export function useFestivalOverlayScenarioComposer() {
  const [scenarios, setScenarios] = useState({});
  const [currentName, setCurrentName] = useState("");
  const [steps, setSteps] = useState([]);

  function addStep(cmd, payload, delay) {
    setSteps((prev) => [...prev, { cmd, payload, delay }]);
  }

  function removeStep(index) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function saveScenario(name) {
    setScenarios((prev) => ({
      ...prev,
      [name]: steps
    }));
  }

  function loadScenario(name) {
    setCurrentName(name);
    setSteps(scenarios[name] || []);
  }

  function clear() {
    setSteps([]);
    setCurrentName("");
  }

  return {
    scenarios,
    currentName,
    steps,
    addStep,
    removeStep,
    saveScenario,
    loadScenario,
    clear
  };
}
