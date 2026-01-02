import { cityMemory } from "../memory/cityMemoryEngine";
import { cityAI } from "../ai/cityAIEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityEconomy = {
  tokens: {
    GATE: { supply: 0, demand: 0, price: 1 },
    CREA: { supply: 0, demand: 0, price: 1 },
    STREET: { supply: 0, demand: 0, price: 1 },
    FEST: { supply: 0, demand: 0, price: 1 }
  },
  inflation: {
    GATE: 0,
    CREA: 0,
    STREET: 0,
    FEST: 0
  },
  cycle: "Stable", // Boom, Stable, Drop, Recovery
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  registerDemand(token, amount) {
    if (!this.tokens[token]) return;
    this.tokens[token].demand += amount;
    this.recalculate(token);
  },

  registerSupply(token, amount) {
    if (!this.tokens[token]) return;
    this.tokens[token].supply += amount;
    this.recalculate(token);
  },

  recalculate(token) {
    const t = this.tokens[token];
    const demand = t.demand || 1;
    const supply = t.supply || 1;

    // Prosty model ceny: popyt / podaż
    t.price = Math.max(0.01, demand / supply);

    // Inflacja: gdy podaż > popyt
    this.inflation[token] = supply > demand ? (supply - demand) / supply : 0;

    this.updateCycle();
    this.notify();
  },

  updateCycle() {
    const totalDemand = Object.values(this.tokens).reduce((acc, t) => acc + t.demand, 0);
    const totalSupply = Object.values(this.tokens).reduce((acc, t) => acc + t.supply, 0);

    if (totalDemand > totalSupply * 1.3) this.cycle = "Boom";
    else if (totalSupply > totalDemand * 1.3) this.cycle = "Drop";
    else if (this.cycle === "Drop" && totalDemand >= totalSupply) this.cycle = "Recovery";
    else this.cycle = "Stable";

    this.reactToCycle();
  },

  reactToCycle() {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Ekonomia:",
      Energetic: "⚡ Rynek:",
      Creative: "🎨 Ekonomia twórców:",
      Calm: "🌙 Rynek spokojny:",
      Chaotic: "🌪️ Rynek szaleje:",
      Celebratory: "🎉 Ekonomia świętuje:"
    };

    const prefix = prefixMap[personality] || "Ekonomia:";

    if (this.cycle === "Boom") {
      cityBroadcast.push(`${prefix} miasto wchodzi w fazę BOOM.`);
    } else if (this.cycle === "Drop") {
      cityBroadcast.push(`${prefix} rynek wchodzi w fazę spadku.`);
    } else if (this.cycle === "Recovery") {
      cityBroadcast.push(`${prefix} rynek odbija po spadku.`);
    }
  }
};

// Integracja z CityMemory: eventy → popyt/podaż
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (!last) return;

  const prefix = last.type.split(".")[0];

  // Prosty mapping eventów na tokeny
  if (prefix === "marketplace") {
    cityEconomy.registerDemand("GATE", 1);
    cityEconomy.registerDemand("CREA", 1);
  }

  if (prefix === "creator") {
    cityEconomy.registerDemand("CREA", 2);
  }

  if (prefix === "street") {
    cityEconomy.registerDemand("STREET", 1);
  }

  if (prefix === "festival") {
    cityEconomy.registerDemand("FEST", 2);
  }

  if (prefix === "community") {
    cityEconomy.registerDemand("GATE", 0.5);
  }
});