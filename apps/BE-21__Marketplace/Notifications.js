import React from "react";

export function BE_21Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_21(event) {
  pushCityNotification({
    title: "Marketplace",
    message: "Nowe zdarzenie: " + event.type
  });
}
