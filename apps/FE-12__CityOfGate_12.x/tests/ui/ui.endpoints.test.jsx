import { describe, it } from "vitest";
import { engine } from "../../DistrictEngine_12.x/engine.js";

describe("UI endpoints", () => {
  it("menu item 'map' is available", async () => {
    const res = await engine.ui.menu.get("map");
    if (!res) throw new Error("Missing menu item: map");
  });
  it("menu item 'districts' is available", async () => {
    const res = await engine.ui.menu.get("districts");
    if (!res) throw new Error("Missing menu item: districts");
  });
  it("menu item 'heartbeat' is available", async () => {
    const res = await engine.ui.menu.get("heartbeat");
    if (!res) throw new Error("Missing menu item: heartbeat");
  });
  it("panel 'district-info' is available", async () => {
    const res = await engine.ui.panels.get("district-info");
    if (!res) throw new Error("Missing panel: district-info");
  });
  it("panel 'economy' is available", async () => {
    const res = await engine.ui.panels.get("economy");
    if (!res) throw new Error("Missing panel: economy");
  });
  it("panel 'governance' is available", async () => {
    const res = await engine.ui.panels.get("governance");
    if (!res) throw new Error("Missing panel: governance");
  });
});
