import { cityHeatmap } from "./cityHeatmapEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

// Map event types to districts
const districtMap = {
  "marketplace": "FE-21",
  "creator": "FE-21",
  "street": "FE-21",
  "festival": "FE-33",
  "community": "FE-03",
  "city": "FE-00"
};

superEngineClient.subscribe(event => {
  const prefix = event.type.split(".")[0];
  const districtId = districtMap[prefix];

  if (districtId) {
    cityHeatmap.update(districtId);
  }
});
