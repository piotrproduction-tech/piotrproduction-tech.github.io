// Hook do danych dzielnicy Knowledge Hub (BE-19)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-19/events")
  };
}
