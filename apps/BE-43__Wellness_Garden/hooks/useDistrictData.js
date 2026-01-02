// Hook do danych dzielnicy Wellness Garden (BE-43)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-43/events")
  };
}
