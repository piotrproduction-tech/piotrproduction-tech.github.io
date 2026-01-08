module.exports = {
    info: (...args) => console.log("[SYNC INFO]", ...args),
    warn: (...args) => console.warn("[SYNC WARN]", ...args),
    error: (...args) => console.error("[SYNC ERROR]", ...args)
};
