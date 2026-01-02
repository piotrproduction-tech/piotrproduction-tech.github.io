import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Reakcje Life Engine na zdarzenia z Volunteer Center (BE-44)
export function getReactions() {
  return [];
}



export function getReactions() {
  return [
    {
      match: (event) => event.module === "BE-44",
      action: (event) => CitySuperEngine.process(event)
    }
  ];
}



import rtraConfig from "../config/rtra.config.json" assert { type: "json" };
// rtraConfig dostępny dla przyszłych, modułowych reakcji.
