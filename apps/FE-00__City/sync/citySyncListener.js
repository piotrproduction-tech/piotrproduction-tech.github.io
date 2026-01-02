import { citySync } from "./citySyncEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

// Every event from SuperEngine is broadcast to all districts
superEngineClient.subscribe(event => {
  citySync.broadcast(event);
});