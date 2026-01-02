// Hook do danych dzielnicy Innovation Hub (BE-24)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-24/events")
  };
}
