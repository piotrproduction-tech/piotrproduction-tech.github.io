export function useDistrictNotifications() {
  return {
    notify: (msg) => console.log("[District Notification]", msg)
  };
}
