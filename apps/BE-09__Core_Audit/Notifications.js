import React from "react";

export function BE_09Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_09(event) {
  pushCityNotification({
    title: "Core Audit",
    message: "Nowe zdarzenie: " + event.type
  });
}
