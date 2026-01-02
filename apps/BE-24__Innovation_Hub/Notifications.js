import React from "react";

export function BE_24Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_24(event) {
  pushCityNotification({
    title: "Innovation Hub",
    message: "Nowe zdarzenie: " + event.type
  });
}
