import { cityPulse } from "./cityPulseEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  // Any event increases pulse
  cityPulse.trigger(event);
});