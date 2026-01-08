import React from "react";

export function HeartbeatInspector({ heartbeat }) {
  return (
    <div className="heartbeat-inspector">
      <h2>City Heartbeat</h2>
      <pre>{JSON.stringify(heartbeat, null, 2)}</pre>
    </div>
  );
}
