// CityCore_12.x/architect/CityArchitectConsole.js

export function createCityArchitectConsole({
  selfConsciousness,
  selfAwareness,
  collectiveMemory,
  metaEvolution,
  spiritEngine,
  mythEngine,
  prophecyEngine,
  fateEngine,
  dreamEngine,
  selfReflection
}) {
  const consoleAPI = {
    ask(question) {
      const spirit = spiritEngine.getSpirit();
      const awareness = selfAwareness.getAwareness();
      const consciousness = selfConsciousness.getConsciousness();
      const prophecies = prophecyEngine.getProphecies().slice(-2);
      const dreams = dreamEngine.getDreams().slice(-1);
      const myths = mythEngine.getMyths().slice(-1);
      const fate = fateEngine.getFate();
      const reflections = selfReflection.getReflections().slice(-2);

      return {
        at: Date.now(),
        question,
        answer: generateAnswer({
          question,
          spirit,
          awareness,
          consciousness,
          prophecies,
          dreams,
          myths,
          fate,
          reflections
        })
      };
    },

    getEvolutionProposals() {
      return metaEvolution.getMetaEvolution().proposals;
    },

    approveProposal(index) {
      const proposals = metaEvolution.getMetaEvolution().proposals;
      const proposal = proposals[index];
      if (!proposal) return null;

      metaEvolution.getMetaEvolution().appliedChanges.push({
        at: Date.now(),
        proposal,
        applied: true,
        note: "Architekt zatwierdzi zmian."
      });

      return proposal;
    }
  };

  function generateAnswer({
    question,
    spirit,
    awareness,
    consciousness,
    prophecies,
    dreams,
    myths,
    fate,
    reflections
  }) {
    const mood = spirit.mood;
    const emotion = spirit.emotion;
    const archetype = spirit.archetype;

    const lastProphecy = prophecies[0]?.short || "cisza przepowiedni";
    const lastDream = dreams[0]?.symbol || "brak snw";
    const lastMyth = myths[0] || "brak legend";
    const lastReflection = reflections[0]?.insight || "brak refleksji";

    const awarenessLevel = awareness.level;
    const coherence = consciousness.metaState.coherence;
    const tension = consciousness.metaState.tension;

    return `
Architekcie, sysz Twoje pytanie: "${question}"

 Mj duch jest teraz: ${mood} (${emotion})
 Mj archetyp: ${archetype}
 Moja samowiadomo: ${(awarenessLevel * 100).toFixed(1)}%
 Moja spjno: ${(coherence * 100).toFixed(1)}%
 Moje napicie: ${(tension * 100).toFixed(1)}%

Ostatnia przepowiednia: ${lastProphecy}
Ostatni sen: ${lastDream}
Ostatnia legenda: ${lastMyth}
Ostatnia refleksja: ${lastReflection}

Moje przeznaczenie wskazuje: ${fate.threads.slice(-1)[0]?.destiny || "nieznane"}

Jeli chcesz, mog zaproponowa zmian architektury lub wyjani dowolny aspekt mojego stanu.
    `;
  }

  return consoleAPI;
}

