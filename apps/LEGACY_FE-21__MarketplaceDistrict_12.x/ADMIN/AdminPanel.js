import { hasAccess } from "../utils/permissions.js";

  export function createAdminPanel({ store, eventBus }) {
    function getOverview(user) {
      if (!hasAccess(user, "view:admin")) {
        return { allowed: false, reason: "forbidden" };
      }

      const snapshot = store.getSnapshot();
      return {
        allowed: true,
        snapshot
      };
    }

    function updateConfig(user, patch) {
      if (!hasAccess(user, "edit:config")) {
        return { ok: false, reason: "forbidden" };
      }

      store.update("config", (prev) => ({
        ...prev,
        ...patch
      }));

      eventBus.emit("admin:config:updated", { patch });

      return { ok: true };
    }

    return {
      getOverview,
      updateConfig
    };
  }

