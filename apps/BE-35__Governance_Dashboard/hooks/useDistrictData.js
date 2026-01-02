// Hook do danych dzielnicy Governance Dashboard (BE-35)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-35/events")
  };
}
