// apps/FE-12__CityOfGate_12.x/src/ui/CityRouter.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { loadDistrict } from "../engine/CityDistrictLoader.js";
import { connectDistrictToCity } from "../engine/CityEventBridge.js";

export default function CityRouter({ engine }) {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to City of Gate 12.x</div>} />
      <Route path="/district/:id" element={<DistrictLoader engine={engine} />} />
    </Routes>
  );
}

function DistrictLoader({ engine }) {
  const { id } = useParams();
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    loadDistrict(id).then((d) => {
      const bridge = connectDistrictToCity({
        engine: d.engine,
        state: d.state,
        heartbeat: engine?.heartbeat
      });

      setDistrict({ ...d, bridge });
    });
  }, [id]);

  if (!district) return <div>Loading district…</div>;

  const Component = district.module;
  return <Component />;
}
