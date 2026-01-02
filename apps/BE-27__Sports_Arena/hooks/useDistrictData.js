// Hook do danych dzielnicy Sports Arena (BE-27)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-27/events")
  };
}
