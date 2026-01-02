import { useFestivalAI } from "./useFestivalAI";

export default function FestivalAIPredictions() {
  const predictions = useFestivalAI();

  return (
    <div>
      <h3>Festival AI Predictions</h3>
      <div>Hot categories: {predictions.hotCategories.join(", ") || "brak"}</div>
      <div>Potential winners: {predictions.potentialWinners.join(", ") || "brak"}</div>
    </div>
  );
}