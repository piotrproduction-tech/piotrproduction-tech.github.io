import React from "react";

export function BE_48Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_48(event) {
  pushCityNotification({
    title: "Business District",
    message: "Nowe zdarzenie: " + event.type
  });
}
