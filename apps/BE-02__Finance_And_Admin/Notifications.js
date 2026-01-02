import React from "react";

export function BE_02Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_02(event) {
  pushCityNotification({
    title: "Finance And Admin",
    message: "Nowe zdarzenie: " + event.type
  });
}
