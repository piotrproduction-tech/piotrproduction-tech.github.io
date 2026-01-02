// Hook do danych dzielnicy Grants Office (BE-13)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-13/events")
  };
}
