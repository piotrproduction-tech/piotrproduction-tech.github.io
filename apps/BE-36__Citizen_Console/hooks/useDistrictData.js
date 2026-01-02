// Hook do danych dzielnicy Citizen Console (BE-36)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-36/events")
  };
}
