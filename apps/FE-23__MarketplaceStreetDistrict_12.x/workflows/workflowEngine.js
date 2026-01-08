import sampleWorkflow from "./sampleWorkflow.json" assert { type: "json" };

  export function createWorkflowEngine({ eventBus, store, registry }) {
    const workflows = new Map();

    function registerWorkflow(id, definition) {
      workflows.set(id, definition);
      eventBus.emit("workflow:registered", { id });
    }

    function run(id, context = {}) {
      const def = workflows.get(id);
      if (!def) {
        eventBus.emit("workflow:missing", { id });
        return null;
      }

      let ctx = { ...context, workflowId: id };

      for (const step of def.steps || []) {
        const { type, target, action } = step;

        if (type === "event") {
          eventBus.emit(target, { ctx, action });
        }

        if (type === "registry") {
          registry.invoke(target, action || "run", ctx);
        }

        if (type === "state") {
          store.update(target, (prev) => ({
            ...prev,
            lastWorkflow: id,
            lastAction: action || null
          }));
        }
      }

      eventBus.emit("workflow:completed", { id, ctx });

      return ctx;
    }

    // register sample
    registerWorkflow("heartbeat", sampleWorkflow);
    registerWorkflow("throttle", {
      id: "throttle",
      steps: [
        { type: "event", target: "engine:throttle", action: "apply" }
      ]
    });

    return {
      registerWorkflow,
      run
    };
  }

