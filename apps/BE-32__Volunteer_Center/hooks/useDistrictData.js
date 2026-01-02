// Hook do danych dzielnicy Volunteer Center (BE-32)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-32/events")
  };
}
