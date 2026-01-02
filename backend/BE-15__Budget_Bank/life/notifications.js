import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Budget Bank (BE-15)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-15") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
