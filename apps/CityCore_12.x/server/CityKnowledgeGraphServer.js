// CityCore_12.x/server/CityKnowledgeGraphServer.js

import http from "http";

export function createCityKnowledgeGraphServer({ knowledgeGraph, port = 3001 }) {
  const server = http.createServer((req, res) => {
    if (req.url === "/knowledge") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(knowledgeGraph.graph, null, 2));
      return;
    }

    res.writeHead(404);
    res.end("Not Found");
  });

  server.listen(port, () => {
    console.log(`CityKnowledgeGraphServer running at http://localhost:${port}/knowledge`);
  });

  return server;
}

