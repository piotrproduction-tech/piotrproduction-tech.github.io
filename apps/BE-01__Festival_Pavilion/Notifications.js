import React from "react";

export function BE_01Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_01(event) {
  pushCityNotification({
    title: "Festival Pavilion",
    message: "Nowe zdarzenie: " + event.type
  });
}
