// CityCore_12.x/knowledge/CityKnowledgeExplorer.js

export function createCityKnowledgeExplorer({ knowledgeGraph }) {
  function renderNode(type, key) {
    const related = knowledgeGraph.query(type, key);

    return `
      <div class="node">
        <h3>${type}: ${key}</h3>
        <ul>
          ${related.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderGraph() {
    const graph = knowledgeGraph.graph;

    return `
      <div class="graph">
        ${Object.keys(graph).map(type => `
          <section>
            <h2>${type.toUpperCase()}</h2>
            ${Object.keys(graph[type]).map(key => renderNode(type, key)).join("")}
          </section>
        `).join("")}
      </div>
    `;
  }

  function mount(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = renderGraph();
  }

  return {
    renderGraph,
    mount
  };
}

