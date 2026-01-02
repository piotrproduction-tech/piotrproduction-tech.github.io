// Hook do danych dzielnicy Grants Office (BE-29)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-29/events")
  };
}
