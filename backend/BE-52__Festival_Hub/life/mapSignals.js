import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Mapowanie zdarzeń na glow kafli dla Festival Hub (BE-52)
export function mapEventToTileSignal(event) {
  return null;
}



export function mapEventToTileSignal(event) {
  if (event.module !== "BE-52") return null;
  const processed = CitySuperEngine.process(event);
  return {
    tileId: processed.life.glow.tileId || "BE-52",
    type: event.type,
    payload: event.payload
  };
}
