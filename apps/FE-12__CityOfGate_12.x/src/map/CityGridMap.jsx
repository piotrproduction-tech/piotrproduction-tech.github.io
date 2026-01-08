import React, { useRef, useEffect } from "react";

export function CityGridMap({ width = 800, height = 600, cellSize = 50 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.font = "10px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.6)";

    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.fillText(x.toString(), x + 2, 10);
    }

    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      ctx.fillText(y.toString(), 2, y - 2);
    }
  }, [width, height, cellSize]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
