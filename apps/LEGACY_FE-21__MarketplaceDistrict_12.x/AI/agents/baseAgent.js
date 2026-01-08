export function createBaseAgent({ eventBus, store, workflows }) {
    function observe(ctx) {
      const snapshot = store.getSnapshot();
      return { ...ctx, snapshot };
    }

    function evaluate(ctx) {
      const { snapshot } = ctx;
      const load = snapshot.analytics?.count || 0;
      const mood = load > 100 ? "overloaded" : "stable";

      return { ...ctx, ai: { mood, load } };
    }

    function act(ctx) {
      const { ai } = ctx;
      if (!ai) return ctx;

      if (ai.mood === "overloaded") {
        workflows.run("throttle", { reason: "ai-overload", load: ai.load });
      }

      eventBus.emit("ai:decision", { ai });

      return ctx;
    }

    return {
      observe,
      evaluate,
      act
    };
  }

