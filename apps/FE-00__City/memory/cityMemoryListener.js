import { cityMemory } from "./cityMemoryEngine";
import { citySync } from "../sync/citySyncEngine";

citySync.subscribe(event => {
  cityMemory.record(event);
});