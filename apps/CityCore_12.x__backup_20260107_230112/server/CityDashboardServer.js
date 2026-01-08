// CityCore_12.x/server/CityDashboardServer.js

import http from "http";

export function createCityDashboardServer({ app, port = 3000 }) {
  const server = http.createServer((req, res) => {
    if (req.url === "/city") {
      const resolved = app.runtime.router.resolve({});
      const state = app.runtime.cityState.getState();

      const district = resolved.activeDistrict;

      const payload = {
        heartbeat: state.lastHeartbeat,
        started: state.started,
        district: {
          id: district?.id,
          name: district?.name,
          route: district?.route,
          type: district?.type
        },
        view: resolved.viewObject,
        panels: resolved.immersive,
        store: district?.store?.getSnapshot?.(),
        registry: district?.registry?.list?.(),
        workflows: district?.workflows?.debug?.(),
        ai: district?.ai?.debug?.()
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(payload));
      return;
    }

    res.writeHead(404);
    res.end("Not Found");
  });

  server.listen(port, () => {
    console.log(`CityDashboardServer running at http://localhost:${port}/city`);
  });

  return server;
}

