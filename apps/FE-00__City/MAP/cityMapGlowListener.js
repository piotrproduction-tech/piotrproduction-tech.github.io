import { cityMapGlow } from "./cityMapGlow";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  // Marketplace events
  if (event.type.startsWith("marketplace.")) {
    cityMapGlow["FE-21"].trigger(event);
  }

  // Creator events
  if (event.type.startsWith("creator.")) {
    cityMapGlow["FE-21"].trigger(event);
  }

  // Street signals
  if (event.type.startsWith("street.")) {
    cityMapGlow["FE-21"].trigger(event);
  }
});
