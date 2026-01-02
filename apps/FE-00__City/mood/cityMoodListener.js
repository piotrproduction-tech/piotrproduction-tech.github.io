import { cityMood } from "./cityMoodEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  cityMood.update(event);
});