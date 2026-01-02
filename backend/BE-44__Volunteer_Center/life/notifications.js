import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Volunteer Center (BE-44)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-44") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
