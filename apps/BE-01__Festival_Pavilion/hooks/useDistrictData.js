// Hook do danych dzielnicy Festival Pavilion (BE-01)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-01/events")
  };
}
