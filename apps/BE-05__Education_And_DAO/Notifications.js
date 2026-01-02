import React from "react";

export function BE_05Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_05(event) {
  pushCityNotification({
    title: "Education And DAO",
    message: "Nowe zdarzenie: " + event.type
  });
}
