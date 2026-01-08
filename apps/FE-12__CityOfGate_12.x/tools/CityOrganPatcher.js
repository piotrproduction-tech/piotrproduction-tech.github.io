// apps/CityCore_12.x/tools/CityOrganPatcher.js

import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const REPORT_PATH = path.join(__dirname, "reports", "CityOrganScanner_report.json");

const DNA_TEMPLATE = (id, name, archetype, color, symbol) => `
export function createDistrictDNA() {
  return {
    identity: {
      id: "${id}",
      name: "${name}",
      archetype: "${archetype}",
      mood: "neutral",
      role: "${archetype}",
      symbol: "${symbol}",
      color: "${color}"
    },

    state: {
      initialized: false,
      lastTick: null,
      data: {}
    },

    init(app) {
      this.state.initialized = true;
      this.state.lastTick = Date.now();
    },

    tick(app) {
      this.state.lastTick = Date.now();
    },

    getState() {
      return this.state;
    },

    setState(newState) {
      this.state = { ...this.state, ...newState };
    },

    getIdentity() {
      return this.identity;
    },

    getCapabilities() {
      return ["ui", "events", "integration"];
    },

    getDependencies() {
      return ["CityCore"];
    },

    reflect() {
      return { insight: "District is stable" };
    },

    evolve() {
      return { evolved: true };
    },

    govern() {
      return { allowed: true };
    },

    dream() {
      return { symbol: "${archetype}-dream" };
    },

    prophecy() {
      return { prediction: "activity rising" };
    },

    onEvent(event) {},
    onUserAction(action) {},
    onAIAction(ai) {},

    onConnect(other) {},
    onDisconnect(other) {},
    onInfluence() {}
  };
}
`;

function main() {
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));

  for (const target of report) {
    if (!target.target.includes("FE-")) continue;

    const id = target.target.match(/FE-(\d+)/)?.[1] || "XX";
    const name = target.target.replace("apps/", "").replace(/_/g, " ");
    const archetype = name.toLowerCase().includes("market") ? "commerce" : "district";
    const color = "#"+Math.floor(Math.random()*16777215).toString(16);
    const symbol = "🏙️";

    const dnaCode = DNA_TEMPLATE(id, name, archetype, color, symbol);

    const dnaDir = path.join(__dirname, "..", "..", "..", target.target, "dna");
    if (!fs.existsSync(dnaDir)) fs.mkdirSync(dnaDir);

    const dnaPath = path.join(dnaDir, `${name}.dna.js`);
    fs.writeFileSync(dnaPath, dnaCode, "utf8");

    console.log("Generated DNA for:", name);
  }
}

main();
