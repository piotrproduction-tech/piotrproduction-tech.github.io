/**
 * CITYOF‑GATE :: ASCII DASHBOARD
 */

export function renderCityDashboard(city = {}, world = {}, metrics = [], logs = [], edges = []) {
  const line = "─".repeat(60);
  const fmt = n => typeof n === "number" ? n.toFixed(2) : n ?? "N/A";

  const block = (title, content) =>
    `\n${title}\n${line}\n${content}\n`;

  const dashboard =
    "\n" +
    "██████████████████████████████████████████████████████████████\n" +
    "█                 CITYOF‑GATE :: ASCII DASHBOARD              █\n" +
    "██████████████████████████████████████████████████████████████\n" +

    block("🌍 WORLD STATE",
      `Economy:        ${world.economy?.value}\n` +
      `Mood:           ${fmt(world.social?.mood)}\n` +
      `Weather:        ${world.weather}\n` +
      `Season:         ${world.season}\n` +
      `Events:         ${world.events?.length}`
    ) +

    block("🧠 CITY BRAIN",
      `City Mood:      ${fmt(city.cityMood)}\n` +
      `Economy Trend:  ${fmt(city.trends?.economy)}\n` +
      `Mood Trend:     ${fmt(city.trends?.mood)}\n` +
      `Predicted Econ: ${fmt(city.prediction?.economyFuture)}\n` +
      `Predicted Mood: ${fmt(city.prediction?.moodFuture)}`
    ) +

    block("📊 TELEMETRY",
      `Ticks:          ${metrics.length}\n` +
      `Avg Tick (ms):  ${(
        metrics.reduce((a, b) => a + b.value, 0) / metrics.length
      ).toFixed(4)}`
    ) +

    block("💾 DATA LAKE",
      `Log entries:    ${logs.length}`
    ) +

    block("🧠 KNOWLEDGE GRAPH",
      `Edges:          ${edges.length}`
    ) +

    block("⭐ META‑INTEGRATION",
      `Reputation:     ${city.userReputation?.value ?? "N/A"}\n` +
      `Tokens:         ${city.tokenBalance?.balance ?? "N/A"}\n` +
      `Role:           ${city.userRole?.role ?? "N/A"}\n` +
      `Directive:      ${city.globalDirective?.type ?? "N/A"}`
    ) +

    "\n" +
    "██████████████████████████████████████████████████████████████\n";

  console.log(dashboard);
}
