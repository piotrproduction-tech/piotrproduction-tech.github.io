// CityCore_12.x/knowledge/CityKnowledgeGraph.js

export function createCityKnowledgeGraph({ app }) {
  const graph = {
    districts: {},
    events: {},
    workflows: {},
    ai: {},
    views: {}
  };

  function addRelation(type, from, to) {
    if (!graph[type][from]) graph[type][from] = new Set();
    graph[type][from].add(to);
  }

  function build() {
    for (const district of app.runtime.router.districts) {
      const id = district.id;

      // District â†’ Views
      if (district.views) {
        for (const v of Object.keys(district.views)) {
          addRelation("views", id, v);
        }
      }

      // District â†’ Events
      if (district.eventBus?.listeners) {
        for (const evt of Object.keys(district.eventBus.listeners)) {
          addRelation("events", id, evt);
        }
      }

      // District â†’ Workflow steps
      if (district.workflows?.debug) {
        const wf = district.workflows.debug();
        for (const step of Object.keys(wf)) {
          addRelation("workflows", id, step);
        }
      }

      // District â†’ AI pipeline
      if (district.ai?.debug) {
        const ai = district.ai.debug();
        for (const stage of Object.keys(ai)) {
          addRelation("ai", id, stage);
        }
      }
    }
  }

  function query(type, key) {
    return Array.from(graph[type][key] || []);
  }

  function print() {
    console.log("=== CITY KNOWLEDGE GRAPH ===");
    console.log(JSON.stringify(graph, null, 2));
  }

  build();

  return {
    graph,
    query,
    print
  };
}

