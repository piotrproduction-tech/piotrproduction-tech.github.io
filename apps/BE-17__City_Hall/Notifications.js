import React from "react";

export function BE_17Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_17(event) {
  pushCityNotification({
    title: "City Hall",
    message: "Nowe zdarzenie: " + event.type
  });
}
