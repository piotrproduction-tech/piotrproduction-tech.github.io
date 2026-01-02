import React from "react";

export function BE_23Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_23(event) {
  pushCityNotification({
    title: "Culture Gallery",
    message: "Nowe zdarzenie: " + event.type
  });
}
