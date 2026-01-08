import schemas from "./formSchemas.json" assert { type: "json" };
  import { validateForm } from "./validators.js";

  export function createFormEngine({ eventBus }) {
    function getSchema(id) {
      return schemas[id] || null;
    }

    function submit(id, data) {
      const schema = getSchema(id);
      if (!schema) {
        return { ok: false, reason: "schema-not-found" };
      }

      const result = validateForm(schema, data);
      if (!result.valid) {
        eventBus.emit("form:invalid", { id, errors: result.errors });
        return { ok: false, errors: result.errors };
      }

      eventBus.emit("form:submitted", { id, data });
      return { ok: true };
    }

    return {
      getSchema,
      submit
    };
  }

