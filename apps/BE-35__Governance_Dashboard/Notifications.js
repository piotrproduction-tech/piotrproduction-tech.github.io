import React from "react";

export function BE_35Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_35(event) {
  pushCityNotification({
    title: "Governance Dashboard",
    message: "Nowe zdarzenie: " + event.type
  });
}
