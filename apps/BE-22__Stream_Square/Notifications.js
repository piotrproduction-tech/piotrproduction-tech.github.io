import React from "react";

export function BE_22Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_22(event) {
  pushCityNotification({
    title: "Stream Square",
    message: "Nowe zdarzenie: " + event.type
  });
}
