import React, { useState } from "react";
import { FestivalPavilionModule } from "../../FE-01__Festival_Pavilion/index.js";

const modules = [FestivalPavilionModule];

export function ModuleLoader() {
  const [route, setRoute] = useState("/festival");

  const handleNav = (newRoute) => (e) => {
    e.preventDefault();
    setRoute(newRoute);
  };

  const activeModule =
    modules.find((m) => route.startsWith(m.config.baseRoute)) || modules[0];

  const content = activeModule.router(route);

  return (
    <div>
      <nav>
        <a href="/festival" onClick={handleNav("/festival")}>
          Festival
        </a>
        {/* tu będą kolejne linki do modułów */}
      </nav>
      <hr />
      <div>{content}</div>
    </div>
  );
}
