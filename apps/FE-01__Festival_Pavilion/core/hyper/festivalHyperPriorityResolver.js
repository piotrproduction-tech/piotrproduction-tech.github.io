// FE_FESTIVAL_HYPER_PRIORITY_RESOLVER

// Priorytety: operator > director > scene > energy > default
export function resolveHyperPriority({ energy, scenario, operator, director }) {
  const layers = {};

  // 1. Operator — absolutny król
  layers.operator = {
    source: "operator",
    weight: 1,
    value: operator,
    score: operator && (operator.overlay || operator.overlayForced) ? 1 : 0,
    reason:
      operator && operator.overlayForced
        ? "overlayForced"
        : operator && operator.overlay
        ? "overlay"
        : null
  };

  // 2. Reżyser — intencja dramaturgiczna
  layers.director = {
    source: "director",
    weight: 1,
    value: director?.intent ?? null,
    score: director?.intent ? 0.8 : 0,
    reason: director?.intent ?? null
  };

  // 3. Scena — aktywna scena
  layers.scene = {
    source: "scene",
    weight: 1,
    value: scenario?.activeScene ?? null,
    score: scenario?.activeScene ? 0.6 : 0,
    reason: scenario?.activeScene ?? null
  };

  // 4. Energia — wysoka energia
  layers.energy = {
    source: "energy",
    weight: 1,
    value: energy?.level ?? null,
    score: energy?.level === "high" ? 0.4 : 0,
    reason: energy?.level === "high" ? "high" : null
  };

  // 5. Default — fallback
  layers.default = {
    source: "default",
    weight: 1,
    value: null,
    score: 0,
    reason: null
  };

  // Wybór zwycięzcy — zgodnie z Twoją logiką
  const winner = pickWinner(layers);

  return {
    winner,
    layers
  };
}

// Funkcja wybierająca zwycięzcę na podstawie score
function pickWinner(layers) {
  let best = "default";
  let bestScore = -Infinity;

  for (const key of Object.keys(layers)) {
    const layer = layers[key];
    const weighted = (layer.score ?? 0) * (layer.weight ?? 1);

    if (weighted > bestScore) {
      bestScore = weighted;
      best = layer.source;
    }
  }

  return best;
}
