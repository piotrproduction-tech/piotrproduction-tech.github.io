// Hook do danych dzielnicy Marketplace (BE-21)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-21/events")
  };
}
