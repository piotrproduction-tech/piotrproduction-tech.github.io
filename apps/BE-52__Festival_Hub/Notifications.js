import React from "react";

export function BE_52Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_52(event) {
  pushCityNotification({
    title: "Festival Hub",
    message: "Nowe zdarzenie: " + event.type
  });
}
