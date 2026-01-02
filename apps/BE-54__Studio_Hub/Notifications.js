import React from "react";

export function BE_54Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_54(event) {
  pushCityNotification({
    title: "Studio Hub",
    message: "Nowe zdarzenie: " + event.type
  });
}
