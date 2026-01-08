import { SyncBridge } from "../SYNC_ENGINE/bridge/SyncBridge.js";
import { jest } from "@jest/globals";;;

test("SyncBridge initializes", () => {
    const sync = new SyncBridge({
  cityAdapter: { send: () => {} },
  festivalAdapter: { send: () => {} },
  router: { route: () => {} }
});

    expect(sync).toBeDefined();
});
