


// FE_FESTIVAL_SCENARIO_RESOLVER

import { ScenarioLibrary, ScenarioSequences } from "./festivalScenarioLibrary";
import { ScenarioState } from "./festivalScenarioState";

// Priorytety scen (im wyżej, tym ważniejsza)
const PRIORITY = {
  director: 100,
  system: 90,
  film: 80,
  music: 70,
  gaming: 60,
  theatre: 50,
  crowd: 40
};

// Wybierz scenę o najwyższym priorytecie
export function resolveScenePriority(sceneNames) {
  if (!sceneNames || sceneNames.length === 0) return null;

  let best = null;
  let bestScore = -Infinity;

  for (const name of sceneNames) {
    const scene = ScenarioLibrary[name];
    if (!scene) continue;

    const score = PRIORITY[scene.type] ?? 0;

    if (score > bestScore) {
      best = name;
      bestScore = score;
    }
  }

  return best;
}

// Rozwiązywanie konfliktów między scenami
export function resolveSceneConflicts(sceneNames) {
  // Jeśli jest tylko jedna scena → nie ma konfliktu
  if (sceneNames.length === 1) return sceneNames[0];

  // Jeśli są sekwencje → sekwencja ma pierwszeństwo
  const sequence = sceneNames.find(name => ScenarioSequences[name]);
  if (sequence) return sequence;

  // Wybierz scenę o najwyższym priorytecie
  return resolveScenePriority(sceneNames);
}

// Wybór sceny z sekwencji

export function resolveSequenceStep(sequenceName) {
  const sequence = ScenarioSequences[sequenceName];
  if (!sequence) return null;

  const index = ScenarioState.history.filter(h => sequence.includes(h.scene)).length;

  return sequence[index] || null;
}


// Główna funkcja resolvera
export function resolveScenario({
  triggers,
  narrativePhase
}) {
  if (!triggers || triggers.length === 0) return null;

  // 1. Rozwiąż konflikty
  const resolved = resolveSceneConflicts(triggers);

  // 2. Jeśli to sekwencja → wybierz krok sekwencji
  if (ScenarioSequences[resolved]) {
    return resolveSequenceStep(resolved);
  }

  // 3. Zwykła scena
  return resolved;
}
