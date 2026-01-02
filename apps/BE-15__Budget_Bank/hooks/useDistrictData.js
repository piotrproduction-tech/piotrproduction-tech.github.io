// Hook do danych dzielnicy Budget Bank (BE-15)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-15/events")
  };
}
