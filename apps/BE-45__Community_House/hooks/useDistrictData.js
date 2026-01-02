// Hook do danych dzielnicy Community House (BE-45)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-45/events")
  };
}
