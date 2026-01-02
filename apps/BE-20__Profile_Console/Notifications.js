import React from "react";

export function BE_20Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_20(event) {
  pushCityNotification({
    title: "Profile Console",
    message: "Nowe zdarzenie: " + event.type
  });
}
