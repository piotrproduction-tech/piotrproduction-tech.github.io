// Hook do danych dzielnicy Culture Gallery (BE-41)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-41/events")
  };
}
