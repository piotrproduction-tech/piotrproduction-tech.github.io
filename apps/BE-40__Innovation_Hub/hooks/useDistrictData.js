// Hook do danych dzielnicy Innovation Hub (BE-40)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-40/events")
  };
}
