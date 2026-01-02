import React from "react";

export function BE_04Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_04(event) {
  pushCityNotification({
    title: "Innovation And Business",
    message: "Nowe zdarzenie: " + event.type
  });
}
