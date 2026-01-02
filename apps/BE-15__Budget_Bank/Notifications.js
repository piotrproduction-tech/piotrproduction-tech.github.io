import React from "react";

export function BE_15Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_15(event) {
  pushCityNotification({
    title: "Budget Bank",
    message: "Nowe zdarzenie: " + event.type
  });
}
