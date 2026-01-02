


// FE_FESTIVAL_DEBUG_CONSOLE_COMPONENT
// Live debug console for all Festival Pavilion engines

import React from "react";
import "./FestivalDebugConsole.css";

export function FestivalDebugConsole({ logs, collapsed, onToggle }) {
  return (
    <div className={"festival-debug-console" + (collapsed ? " collapsed" : "")}>
      <div className="debug-header" onClick={onToggle}>
        <span>Festival Debug Console</span>
        <span>{collapsed ? "▲" : "▼"}</span>
      </div>

      {!collapsed && (
        <div className="debug-body">
          {logs.map((log, idx) => (
            <div key={idx} className={"debug-line debug-" + log.source}>
              <span className="debug-time">{log.time}</span>
              <span className="debug-source">[{log.source}]</span>
              <span className="debug-message">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
