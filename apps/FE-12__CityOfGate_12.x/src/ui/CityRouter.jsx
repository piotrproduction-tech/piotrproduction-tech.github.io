// apps/FE-12__CityOfGate_12.x/src/ui/CityRouter.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

export default function CityRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to City of Gate 12.x</div>} />
      <Route path="/district/:id" element={<DistrictLoader />} />
    </Routes>
  );
}

function DistrictLoader() {
  return <div>District loading… (dynamic loader will be added)</div>;
}
