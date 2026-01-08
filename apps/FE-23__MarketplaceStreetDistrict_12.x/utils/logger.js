export function createLogger(scope = "district") {
    function log(level, message, meta = {}) {
      const entry = {
        scope,
        level,
        message,
        meta,
        at: new Date().toISOString()
      };
      // In real env: send to console, remote, etc.
      // For now: just return entry for tests.
      return entry;
    }

    return {
      info: (msg, meta) => log("info", msg, meta),
      warn: (msg, meta) => log("warn", msg, meta),
      error: (msg, meta) => log("error", msg, meta)
    };
  }

