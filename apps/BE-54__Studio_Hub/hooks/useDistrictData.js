// Hook do danych dzielnicy Studio Hub (BE-54)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-54/events")
  };
}
