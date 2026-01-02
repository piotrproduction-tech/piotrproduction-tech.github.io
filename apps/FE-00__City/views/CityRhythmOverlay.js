import { useEffect, useState } from "react";
import { cityRhythm } from "../rhythm/cityRhythmEngine";

export default function CityRhythmOverlay() {
  const [rhythm, setRhythm] = useState(cityRhythm.rhythm);

  useEffect(() => {
    cityRhythm.subscribe(newRhythm => setRhythm(newRhythm));
  }, []);

  const gradients = {
    MorningFlow: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(200,220,255,0.4))",
    MiddayActivity: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,230,150,0.4))",
    EveningMarket: "linear-gradient(180deg, rgba(255,180,120,0.3), rgba(255,120,80,0.4))",
    NightCreators: "linear-gradient(180deg, rgba(40,0,80,0.4), rgba(0,0,0,0.6))",
    FestivalMode: "linear-gradient(180deg, rgba(255,200,0,0.4), rgba(255,0,150,0.4))"
  };

  return (
    <div
      className="city-rhythm-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: gradients[rhythm] || gradients.MorningFlow,
        pointerEvents: "none",
        transition: "background 1s ease"
      }}
    />
  );
}