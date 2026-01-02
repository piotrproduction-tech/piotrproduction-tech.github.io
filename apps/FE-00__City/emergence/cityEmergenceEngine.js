import { citySimulation } from "../simulation/citySimulationEngine";
import { cityEconomy } from "../economy/cityEconomyEngine";
import { cityReputation } from "../reputation/cityReputationEngine";
import { cityGovernance } from "../governance/cityGovernanceEngine";
import { cityNarrative } from "../narrative/cityNarrativeEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";
import { cityAI } from "../ai/cityAIEngine";

export const cityEmergence = {
  tick: 0,
  patterns: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  detectPatterns() {
    this.tick++;

    const econ = cityEconomy;
    const rep = cityReputation;
    const gov = cityGovernance;
    const sim = citySimulation;
    const ai = cityAI.predictions;

    const cycle = econ.cycle;
    const topUsers = Object.entries(rep.users || {})
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 3)
      .map(([id]) => id);

    const activeProposals = (gov.activeVotes || []).length;
    const lastSim = sim.lastSimulatedEvent;

    const pattern = {
      tick: this.tick,
      cycle,
      topUsers,
      activeProposals,
      lastSimType: lastSim?.type || null,
      lastSimDistrict: lastSim?.payload?.district || null,
      predictedHotDistrict: ai.nextHotDistrict || null
    };

    this.patterns.push(pattern);
    this.react(pattern);
    this.notify();
  },

  react(pattern) {
    const personality = cityPersonality.personality;

    // Przykładowe emergentne zachowania:
    // 1. Jeśli BOOM + dużo głosowań → miasto ogłasza "społeczną falę"
    if (pattern.cycle === "Boom" && pattern.activeProposals >= 3) {
      const msg =
        personality === "Energetic"
          ? "⚡ Miasto wchodzi w społeczną hiperaktywność!"
          : "Miasto doświadcza fali społecznej aktywności.";
      cityBroadcast.push(msg);
    }

    // 2. Jeśli Drop + brak głosowań + brak top userów → miasto sygnalizuje stagnację
    if (pattern.cycle === "Drop" && pattern.activeProposals === 0 && pattern.topUsers.length === 0) {
      const msg =
        personality === "Calm"
          ? "🌙 Miasto zapada w spokojną stagnację."
          : "Miasto doświadcza okresu stagnacji.";
      cityBroadcast.push(msg);
    }

    // 3. Jeśli powtarza się ten sam district w symulacji + AI wskazuje ten sam → miasto tworzy "hot zone"
    if (
      pattern.lastSimDistrict &&
      pattern.predictedHotDistrict &&
      pattern.lastSimDistrict === pattern.predictedHotDistrict
    ) {
      const msg =
        personality === "Creative"
          ? `🎨 Dzielnica ${pattern.lastSimDistrict} staje się kreatywną hot‑zoną miasta.`
          : `Dzielnica ${pattern.lastSimDistrict} staje się strefą wysokiej aktywności.`;
      cityBroadcast.push(msg);

      // Możemy też dodać mikro‑historię
      cityNarrative.stories.push({
        text: `Miasto rozpoznaje nowy wzór: dzielnica ${pattern.lastSimDistrict} przyciąga coraz więcej aktywności.`,
        timestamp: Date.now()
      });
    }
  }
};

// Detekcja wzorców co 10 sekund
setInterval(() => cityEmergence.detectPatterns(), 10000);