// CityCore_12.x/scenario/CityScenarioWorkbench.js

export function createCityScenarioWorkbench({ app, scenarioEngine }) {
  function renderUI(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const districts = app.runtime.router.districts.map(d => d.id);

    el.innerHTML = `
      <h2>City Scenario Workbench</h2>

      <label>District:</label>
      <select id="sc-district">
        ${districts.map(d => `<option value="${d}">${d}</option>`).join("")}
      </select>

      <label>View:</label>
      <input id="sc-view" placeholder="np. mainView" />

      <label>Event:</label>
      <input id="sc-event" placeholder="np. update" />

      <label>Payload (JSON):</label>
      <textarea id="sc-payload" rows="4">{}</textarea>

      <button id="sc-run">Uruchom scenariusz</button>

      <h3>Wynik:</h3>
      <pre id="sc-output"></pre>
    `;

    document.getElementById("sc-run").onclick = () => {
      const district = document.getElementById("sc-district").value;
      const view = document.getElementById("sc-view").value;
      const event = document.getElementById("sc-event").value;
      const payload = JSON.parse(document.getElementById("sc-payload").value || "{}");

      const actions = [];

      if (district) actions.push({ type: "gotoDistrict", district });
      if (view) actions.push({ type: "gotoView", view });
      if (event) actions.push({ type: "emit", district, event, payload });

      const result = scenarioEngine.simulate(actions);

      document.getElementById("sc-output").textContent =
        JSON.stringify(result, null, 2);
    };
  }

  return {
    renderUI
  };
}

