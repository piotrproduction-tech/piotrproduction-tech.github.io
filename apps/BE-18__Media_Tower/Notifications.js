import React from "react";

export function BE_18Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_18(event) {
  pushCityNotification({
    title: "Media Tower",
    message: "Nowe zdarzenie: " + event.type
  });
}
