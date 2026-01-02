import React, { useState } from "react";
import { FE_01_Module } from "../../FE-01__Festival_Pavilion/index.js";
import { FE_02_Module } from "../../FE-02__Marketplace/index.js";

const modules = [
  FE_01_Module,
  FE_02_Module
];

export function ModuleLoader() {
  const [route, setRoute] = useState(
    modules[0]?.config?.baseRoute || "/"
  );

  const handleNav = (newRoute) => (e) => {
    e.preventDefault();
    setRoute(newRoute);
  };

  const activeModule =
    modules.find((m) => route.startsWith(m.config.baseRoute)) || modules[0];

  return (
    <div>
      <nav>
        {modules.map((m) => (
          <a
            key={m.config.id}
            href={m.config.baseRoute}
            onClick={handleNav(m.config.baseRoute)}
            style={{ marginRight: "12px" }}
          >
            {m.config.name}
          </a>
        ))}
      </nav>
      <hr />
      {activeModule ? (
        activeModule.router(route)
      ) : (
        <div>Brak aktywnego modułu dla ścieżki: {route}</div>
      )}
    </div>
  );
}
