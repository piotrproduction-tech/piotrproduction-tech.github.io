// Hook do danych dzielnicy Profile Console (BE-20)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-20/events")
  };
}
