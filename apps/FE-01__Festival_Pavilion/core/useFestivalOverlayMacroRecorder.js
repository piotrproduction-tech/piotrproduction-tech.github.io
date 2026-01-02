


// FE_FESTIVAL_OVERLAY_MACRORECORDER_HOOK
// Records and plays back overlay commands

import { useState, useRef } from "react";

export function useFestivalOverlayMacroRecorder(presetManager, controller) {
  const [recording, setRecording] = useState(false);
  const [macros, setMacros] = useState({});
  const [currentMacroName, setCurrentMacroName] = useState(null);

  const buffer = useRef([]);

  function startRecording(name) {
    setRecording(true);
    setCurrentMacroName(name);
    buffer.current = [];
  }

  function stopRecording() {
    setRecording(false);
    if (!currentMacroName) return;

    setMacros((prev) => ({
      ...prev,
      [currentMacroName]: [...buffer.current]
    }));

    buffer.current = [];
    setCurrentMacroName(null);
  }

  function recordCommand(cmd, payload) {
    if (!recording) return;

    buffer.current.push({
      time: Date.now(),
      cmd,
      payload
    });
  }

  async function playMacro(name) {
    const macro = macros[name];
    if (!macro) return;

    let lastTime = macro[0]?.time || 0;

    for (const step of macro) {
      const delay = step.time - lastTime;
      lastTime = step.time;

      await new Promise((res) => setTimeout(res, delay));

      execute(step.cmd, step.payload);
    }
  }

  function execute(cmd, payload) {
    switch (cmd) {
      case "setPreset":
        presetManager.applyPreset(payload);
        break;

      case "setMode":
        controller.setMode(payload);
        break;

      case "toggle":
        controller.setToggles({
          ...controller.toggles,
          [payload]: !controller.toggles[payload]
        });
        break;

      case "setToggles":
        controller.setToggles(payload);
        break;

      default:
        console.warn("MacroRecorder: unknown command", cmd);
    }
  }

  return {
    recording,
    macros,
    startRecording,
    stopRecording,
    recordCommand,
    playMacro
  };
}
