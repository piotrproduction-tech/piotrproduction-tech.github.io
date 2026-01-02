const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const COMPONENTS = path.join(FE01, "components");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// 1. core/useFestivalOverlayMacroRecorder.js
//
function macroRecorderHook() {
  const file = path.join(CORE, "useFestivalOverlayMacroRecorder.js");
  const marker = "// FE_FESTIVAL_OVERLAY_MACRORECORDER_HOOK";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayMacroRecorder.js — UI panel
//
function macroRecorderComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayMacroRecorder.js");
  const marker = "// FE_FESTIVAL_OVERLAY_MACRORECORDER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_MACRORECORDER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayMacroRecorder.css";

export function FestivalOverlayMacroRecorder({ macro }) {
  const [macroName, setMacroName] = useState("");

  return (
    <div className="overlay-macrorecorder">
      <h3>Overlay Macro Recorder</h3>

      <div className="macro-section">
        <input
          type="text"
          placeholder="Macro name"
          value={macroName}
          onChange={(e) => setMacroName(e.target.value)}
        />

        {!macro.recording && (
          <button onClick={() => macro.startRecording(macroName)}>
            Start Recording
          </button>
        )}

        {macro.recording && (
          <button onClick={macro.stopRecording}>
            Stop Recording
          </button>
        )}
      </div>

      <div className="macro-section">
        <h4>Saved Macros</h4>
        {Object.keys(macro.macros).map((m) => (
          <button key={m} onClick={() => macro.playMacro(m)}>
            ▶ {m}
          </button>
        ))}
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. components/FestivalOverlayMacroRecorder.css
//
function macroRecorderCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayMacroRecorder.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_MACRORECORDER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_MACRORECORDER_CSS */

.overlay-macrorecorder {
  position: fixed;
  bottom: 12px;
  left: 240px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 240px;
  font-size: 13px;
}

.macro-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.overlay-macrorecorder button {
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: none;
  cursor: pointer;
}

.overlay-macrorecorder input {
  padding: 6px;
  border-radius: 6px;
  border: none;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_MACRORECORDER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_MACRORECORDER_INTEGRATION
import { FestivalOverlayMacroRecorder } from "./FestivalOverlayMacroRecorder";
import { useFestivalOverlayMacroRecorder } from "../core/useFestivalOverlayMacroRecorder";

const macro = useFestivalOverlayMacroRecorder(presetManager, { mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayMacroRecorder macro={macro} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayMacroRecorder Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  macroRecorderHook();
  macroRecorderComponent();
  macroRecorderCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
