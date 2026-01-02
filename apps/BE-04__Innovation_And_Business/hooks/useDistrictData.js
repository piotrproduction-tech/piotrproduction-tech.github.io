// Hook do danych dzielnicy Innovation And Business (BE-04)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-04/events")
  };
}
