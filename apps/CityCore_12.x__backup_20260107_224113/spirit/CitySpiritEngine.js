// CityCore_12.x/spirit/CitySpiritEngine.js

export function createCitySpiritEngine({ app, recorder, mythEngine, anomalyDetector }) {
  const spirit = {
    mood: "neutral",
    emotion: "calm",
    archetype: "guardian",
    memory: [],
    reactions: []
  };

  const archetypes = ["guardian", "trickster", "oracle", "wanderer", "judge"];

  function updateMood() {
    const timeline = recorder.getTimeline();
    const last = timeline[timeline.length - 1];

    if (!last) return;

    if (last.ai?.error) spirit.mood = "disturbed";
    else if (last.workflow?.slow) spirit.mood = "tense";
    else if (last.panels?.length > 3) spirit.mood = "focused";
    else spirit.mood = "calm";
  }

  function updateEmotion() {
    const anomalies = anomalyDetector.alerts;
    if (anomalies.length > 0) {
      spirit.emotion = "alert";
      return;
    }

    if (spirit.mood === "disturbed") spirit.emotion = "fear";
    else if (spirit.mood === "tense") spirit.emotion = "stress";
    else spirit.emotion = "calm";
  }

  function updateArchetype() {
    // Archetyp zmienia siÄ™ w zaleĹĽnoĹ›ci od historii
    const myths = mythEngine.getMyths();
    if (myths.length % 5 === 0) {
      const index = Math.floor(Math.random() * archetypes.length);
      spirit.archetype = archetypes[index];
    }
  }

  function react() {
    const reaction = {
      at: Date.now(),
      mood: spirit.mood,
      emotion: spirit.emotion,
      archetype: spirit.archetype,
      message: generateReactionMessage()
    };

    spirit.reactions.push(reaction);
    spirit.memory.push(reaction);
  }

  function generateReactionMessage() {
    switch (spirit.archetype) {
      case "guardian":
        return "Miasto czuwa nad rĂłwnowagÄ….";
      case "trickster":
        return "Miasto uĹ›miecha siÄ™ krzywo, jakby znaĹ‚o sekret.";
      case "oracle":
        return "Miasto szepcze o przyszĹ‚oĹ›ci, ktĂłrej jeszcze nie ma.";
      case "wanderer":
        return "Miasto bĹ‚Ä…dzi, ale nie gubi siÄ™.";
      case "judge":
        return "Miasto waĹĽy konsekwencje kaĹĽdego czynu.";
      default:
        return "Miasto milczy.";
    }
  }

  function tick() {
    updateMood();
    updateEmotion();
    updateArchetype();
    react();
  }

  setInterval(tick, 3000);

  return {
    getSpirit: () => spirit,
    getReactions: () => spirit.reactions
  };
}

