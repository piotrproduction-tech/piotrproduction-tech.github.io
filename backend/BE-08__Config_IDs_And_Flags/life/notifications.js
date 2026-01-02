import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Config IDs And Flags (BE-08)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-08") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
