import React from "react";

export function BE_49Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_49(event) {
  pushCityNotification({
    title: "Budget Bank",
    message: "Nowe zdarzenie: " + event.type
  });
}
