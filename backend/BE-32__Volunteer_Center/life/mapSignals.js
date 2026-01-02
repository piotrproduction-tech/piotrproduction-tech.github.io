import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Mapowanie zdarzeń na glow kafli dla Volunteer Center (BE-32)
export function mapEventToTileSignal(event) {
  return null;
}



export function mapEventToTileSignal(event) {
  if (event.module !== "BE-32") return null;
  const processed = CitySuperEngine.process(event);
  return {
    tileId: processed.life.glow.tileId || "BE-32",
    type: event.type,
    payload: event.payload
  };
}
