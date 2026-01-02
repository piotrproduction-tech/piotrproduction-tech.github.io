import React from "react";

export function BE_37Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_37(event) {
  pushCityNotification({
    title: "Immersive VR Layer",
    message: "Nowe zdarzenie: " + event.type
  });
}
