


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
