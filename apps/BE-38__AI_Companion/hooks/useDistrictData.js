// Hook do danych dzielnicy AI Companion (BE-38)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-38/events")
  };
}
