let HEARTBEAT = [];

export function logHeartbeat(event) {
  HEARTBEAT.push({ ...event, ts: Date.now() });
  if (HEARTBEAT.length > 200) HEARTBEAT.shift();
}

export function getHeartbeat() {
  return HEARTBEAT;
}
