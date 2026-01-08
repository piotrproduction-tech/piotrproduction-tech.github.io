export function validateForm(schema, data) {
    const errors = [];

    for (const field of schema.fields || []) {
      const value = data[field.id];

      if (field.required && (value === undefined || value === null || value === "")) {
        errors.push({ field: field.id, reason: "required" });
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

