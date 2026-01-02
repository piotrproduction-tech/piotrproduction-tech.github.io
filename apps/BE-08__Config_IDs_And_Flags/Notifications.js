import React from "react";

export function BE_08Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_08(event) {
  pushCityNotification({
    title: "Config IDs And Flags",
    message: "Nowe zdarzenie: " + event.type
  });
}
