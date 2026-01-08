import { createBaseAgent } from "./agents/baseAgent.js";

  export function createAIPipeline({ eventBus, store, workflows }) {
    const baseAgent = createBaseAgent({ eventBus, store, workflows });

    const pipelines = {
      heartbeat: [
        (ctx) => baseAgent.observe(ctx),
        (ctx) => baseAgent.evaluate(ctx),
        (ctx) => baseAgent.act(ctx)
      ]
    };

    function process(pipelineName, context = {}) {
      const steps = pipelines[pipelineName];
      if (!steps) {
        eventBus.emit("ai:pipeline:missing", { pipelineName });
        return null;
      }

      let ctx = { ...context, pipeline: pipelineName };
      for (const step of steps) {
        try {
          ctx = step(ctx) || ctx;
        } catch (err) {
          eventBus.emit("ai:pipeline:error", {
            pipelineName,
            step: step.name || "anonymous",
            error: String(err)
          });
        }
      }

      eventBus.emit("ai:pipeline:completed", {
        pipelineName,
        context: ctx
      });

      return ctx;
    }

    return {
      process
    };
  }

