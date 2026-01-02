import React from "react";

export function BE_16Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_16(event) {
  pushCityNotification({
    title: "Admin Tower",
    message: "Nowe zdarzenie: " + event.type
  });
}
