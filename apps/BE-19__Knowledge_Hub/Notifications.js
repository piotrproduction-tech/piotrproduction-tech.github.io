import React from "react";

export function BE_19Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_19(event) {
  pushCityNotification({
    title: "Knowledge Hub",
    message: "Nowe zdarzenie: " + event.type
  });
}
