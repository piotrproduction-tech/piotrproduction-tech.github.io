import { cityMemory } from "../memory/cityMemoryEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";
import { cityAI } from "../ai/cityAIEngine";

export const cityNarrative = {
  stories: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.stories));
  },

  generateStory(event) {
    const personality = cityPersonality.personality;
    const pred = cityAI.predictions;

    const templates = {
      Neutral: (e) => `W mieście wydarzyło się: ${e.type}.`,
      Energetic: (e) => `⚡ Miasto pulsuje! Właśnie nastąpiło: ${e.type}.`,
      Creative: (e) => `🎨 Na ulicach pojawiła się nowa inspiracja: ${e.type}.`,
      Calm: (e) => `🌙 W ciszy miasta pojawił się subtelny ruch: ${e.type}.`,
      Chaotic: (e) => `🌪️ Chaos przetacza się przez miasto! Event: ${e.type}.`,
      Celebratory: (e) => `🎉 Miasto świętuje! Wydarzenie: ${e.type}.`
    };

    const base = templates[personality](event);

    const extended = `${base} 
Miasto przewiduje, że kolejna aktywna dzielnica to: ${pred.nextHotDistrict}.`;

    this.stories.push({
      text: extended,
      timestamp: Date.now()
    });

    this.notify();
  }
};

// Auto-generate narrative when memory records an event
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (last) cityNarrative.generateStory(last);
});