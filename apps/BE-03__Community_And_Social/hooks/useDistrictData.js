// Hook do danych dzielnicy Community And Social (BE-03)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-03/events")
  };
}
