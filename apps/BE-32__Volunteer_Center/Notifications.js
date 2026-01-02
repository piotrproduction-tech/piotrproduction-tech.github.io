import React from "react";

export function BE_32Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_32(event) {
  pushCityNotification({
    title: "Volunteer Center",
    message: "Nowe zdarzenie: " + event.type
  });
}
