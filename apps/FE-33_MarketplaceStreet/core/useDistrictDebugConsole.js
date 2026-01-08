export function useDistrictDebugConsole() {
  return {
    log: (...args) => console.log("[District Debug]", ...args)
  };
}
