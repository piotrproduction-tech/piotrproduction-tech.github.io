import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Innovation And Business (BE-04)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-04") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
