// Hook do danych dzielnicy Volunteer Center (BE-44)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-44/events")
  };
}
