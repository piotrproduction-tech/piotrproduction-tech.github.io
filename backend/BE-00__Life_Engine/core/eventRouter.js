import { applyReactions } from "./reactionEngine.js";
import { sendMapSignal } from "./mapSignals.js";
import { sendNotification } from "./notifications.js";
import { logHeartbeat } from "./heartbeat.js";

export async function routeEvent(type, payload) {
  // 1. log
  logHeartbeat({ type, payload });

  // 2. animacje mapy
  sendMapSignal(type, payload);

  // 3. powiadomienia
  sendNotification(type, payload);

  // 4. reakcje systemowe (tokeny, reputacja, kary)
  await applyReactions(type, payload);
}
