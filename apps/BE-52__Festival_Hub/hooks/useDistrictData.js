// Hook do danych dzielnicy Festival Hub (BE-52)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-52/events")
  };
}
