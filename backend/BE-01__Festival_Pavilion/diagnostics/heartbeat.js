


// DIAG_HEARTBEAT
// Festival Pavilion heartbeat (BPM, mood, load)

export function getFestivalHeartbeat(globalState) {
  const f = globalState.festival || {};

  const bpm = 70 + Math.floor(Math.random() * 25);
  const moods = ["Calm", "Energetic", "Creative", "Tense"];
  const mood = moods[Math.floor(Math.random() * moods.length)];

  const load = {
    submissions: (f.submissions || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length
  };

  return {
    timestamp: Date.now(),
    bpm,
    mood,
    load
  };
}
