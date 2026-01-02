import { useState, useEffect } from "react";

export function useFestivalAI() {
  const [predictions, setPredictions] = useState({ hotCategories: [], potentialWinners: [] });

  useEffect(() => {
    // TODO: integrate with City AI Engine
    setPredictions({
      hotCategories: [],
      potentialWinners: []
    });
  }, []);

  return predictions;
}