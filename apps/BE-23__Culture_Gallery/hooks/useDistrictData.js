// Hook do danych dzielnicy Culture Gallery (BE-23)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-23/events")
  };
}
