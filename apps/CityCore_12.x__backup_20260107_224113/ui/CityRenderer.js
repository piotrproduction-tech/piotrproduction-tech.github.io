// CityCore_12.x/ui/CityRenderer.js

export function createCityRenderer() {
  function renderToConsole(ui) {
    console.clear();
    console.log("=== CITY VIEW ===");
    console.log(JSON.stringify(ui, null, 2));
  }

  function renderToHTML(ui) {
    return `
      <div class="city-shell">
        <h1>District: ${ui.district || "None"}</h1>
        <pre>${JSON.stringify(ui.view, null, 2)}</pre>
        <pre>${JSON.stringify(ui.panels, null, 2)}</pre>
      </div>
    `;
  }

  function renderToReact(ui, React) {
    return React.createElement(
      "div",
      { className: "city-shell" },
      React.createElement("h1", null, `District: ${ui.district || "None"}`),
      React.createElement("pre", null, JSON.stringify(ui.view, null, 2)),
      React.createElement("pre", null, JSON.stringify(ui.panels, null, 2))
    );
  }

  return {
    renderToConsole,
    renderToHTML,
    renderToReact
  };
}

