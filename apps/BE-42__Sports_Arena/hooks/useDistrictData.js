// Hook do danych dzielnicy Sports Arena (BE-42)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-42/events")
  };
}
