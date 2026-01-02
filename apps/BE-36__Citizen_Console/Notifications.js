import React from "react";

export function BE_36Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_36(event) {
  pushCityNotification({
    title: "Citizen Console",
    message: "Nowe zdarzenie: " + event.type
  });
}
