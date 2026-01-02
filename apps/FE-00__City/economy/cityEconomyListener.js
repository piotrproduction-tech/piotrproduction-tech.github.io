import { cityEconomy } from "./cityEconomyEngine";
import { cityAI } from "../ai/cityAIEngine";

// Prosty hook: AI może reagować na stan ekonomii
cityEconomy.subscribe(econ => {
  // Przykład: jeśli BOOM → AI może przewidywać wzrost aktywności
  if (econ.cycle === "Boom") {
    cityAI.predictions.nextMood = "Energetic";
  }
});