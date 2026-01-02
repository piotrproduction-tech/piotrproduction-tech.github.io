// Hook do danych dzielnicy Grants Office (BE-47)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-47/events")
  };
}
