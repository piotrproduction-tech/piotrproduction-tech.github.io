import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export default function CityHeatmapOverlay() {
  return (
    <div className="city-heatmap-overlay">
      {Object.entries(cityHeatmap.districts).map(([id, data]) => (
        <div
          key={id}
          className="heatmap-dot"
          style={{
            opacity: data.intensity,
            boxShadow: `0 0 ${40 * data.intensity}px rgba(255, 80, 0, 0.8)`,
            position: "absolute",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            left: id === "FE-21" ? "200px" :
                  id === "FE-33" ? "350px" :
                  id === "FE-03" ? "120px" :
                  "50px",
            top: id === "FE-21" ? "150px" :
                 id === "FE-33" ? "220px" :
                 id === "FE-03" ? "300px" :
                 "80px"
          }}
        />
      ))}
    </div>
  );
}