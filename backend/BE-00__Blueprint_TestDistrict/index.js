import express from "express";

// API LAYER
import { districtApi } from "./api/districtApi.js";
import { statusApi } from "./api/statusApi.js";
import { actionsApi } from "./api/actionsApi.js";
import { syncApi } from "./api/syncApi.js";
import { workflowLayer } from "./workflow/index.js";
import { lifeLayer } from "./life/index.js";

export const BlueprintTestDistrict = express.Router();

// STATUS (działa już teraz)
BlueprintTestDistrict.get("/status", (req, res) => {
  res.json({
    ok: true,
    module: "BE-00-BLUEPRINT",
    name: "Blueprint Test District",
    ts: Date.now()
  });
});

// API LAYER MOUNT
BlueprintTestDistrict.use("/api", districtApi);
BlueprintTestDistrict.use("/api/status", statusApi);
BlueprintTestDistrict.use("/api/actions", actionsApi);
BlueprintTestDistrict.use("/api/sync", syncApi);
BlueprintTestDistrict.use("/workflow", workflowLayer);
BlueprintTestDistrict.use("/life", lifeLayer);
