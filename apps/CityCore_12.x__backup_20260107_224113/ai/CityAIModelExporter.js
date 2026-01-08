// CityCore_12.x/ai/CityAIModelExporter.js

export function createCityAIModelExporter({ app, aiTrainer }) {
  function exportJSON() {
    return JSON.stringify(aiTrainer.getModel(), null, 2);
  }

  function exportGraphML() {
    const model = aiTrainer.getModel();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <graph edgedefault="directed">
`;

    for (const district in model.aiPolicies) {
      xml += `    <node id="${district}" />\n`;
    }

    for (const from in model.transitions) {
      for (const to in model.transitions[from]) {
        xml += `    <edge source="${from}" target="${to}" />\n`;
      }
    }

    xml += `  </graph>
</graphml>`;

    return xml;
  }

  return {
    exportJSON,
    exportGraphML
  };
}

