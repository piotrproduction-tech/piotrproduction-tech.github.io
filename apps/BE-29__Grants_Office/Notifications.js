import React from "react";

export function BE_29Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_29(event) {
  pushCityNotification({
    title: "Grants Office",
    message: "Nowe zdarzenie: " + event.type
  });
}
