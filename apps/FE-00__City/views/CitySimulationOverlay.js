import { useEffect, useState } from "react";
import { citySimulation } from "../simulation/citySimulationEngine";

export default function CitySimulationOverlay() {
  const [sim, setSim] = useState(citySimulation);

  useEffect(() => {
    citySimulation.subscribe(s => setSim({ ...s }));
  }, []);

  return (
    <div
      className="city-simulation-overlay"
      style={{
        position: "absolute",
        top: "290px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Symulacja miasta:</strong>
      <div>Tick: {sim.tick}</div>
      {sim.lastSimulatedEvent ? (
        <div style={{ marginTop: "6px" }}>
          <div>Ostatni event:</div>
          <div>{sim.lastSimulatedEvent.type}</div>
          <div>Dzielnica: {sim.lastSimulatedEvent.payload.district}</div>
          <div>Intensywność: {sim.lastSimulatedEvent.payload.intensity}</div>
        </div>
      ) : (
        <div>Brak danych symulacji.</div>
      )}
    </div>
  );
}