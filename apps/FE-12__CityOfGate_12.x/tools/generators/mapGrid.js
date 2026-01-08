const fs = require("fs");
const path = require("path");

function generateMapGrid() {
  const dir = path.resolve("src/map");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = path.join(dir, "CityGridMap.jsx");

  const content =
    "import React, { useRef, useEffect } from \"react\";\n\n" +
    "export function CityGridMap({ width = 800, height = 600, cellSize = 50 }) {\n" +
    "  const canvasRef = useRef(null);\n\n" +
    "  useEffect(() => {\n" +
    "    const canvas = canvasRef.current;\n" +
    "    if (!canvas) return;\n" +
    "    const ctx = canvas.getContext(\"2d\");\n" +
    "    ctx.clearRect(0, 0, width, height);\n" +
    "    ctx.strokeStyle = \"rgba(255,255,255,0.2)\";\n" +
    "    ctx.font = \"10px monospace\";\n" +
    "    ctx.fillStyle = \"rgba(255,255,255,0.6)\";\n\n" +
    "    for (let x = 0; x <= width; x += cellSize) {\n" +
    "      ctx.beginPath();\n" +
    "      ctx.moveTo(x, 0);\n" +
    "      ctx.lineTo(x, height);\n" +
    "      ctx.stroke();\n" +
    "      ctx.fillText(x.toString(), x + 2, 10);\n" +
    "    }\n\n" +
    "    for (let y = 0; y <= height; y += cellSize) {\n" +
    "      ctx.beginPath();\n" +
    "      ctx.moveTo(0, y);\n" +
    "      ctx.lineTo(width, y);\n" +
    "      ctx.stroke();\n" +
    "      ctx.fillText(y.toString(), 2, y - 2);\n" +
    "    }\n" +
    "  }, [width, height, cellSize]);\n\n" +
    "  return <canvas ref={canvasRef} width={width} height={height} />;\n" +
    "}\n";

  fs.writeFileSync(file, content);
  console.log("✔ CityGridMap:", file);
}

module.exports = { generateMapGrid };
