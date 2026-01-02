import React from "react";

export function BE_51Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_51(event) {
  pushCityNotification({
    title: "Education And DAO",
    message: "Nowe zdarzenie: " + event.type
  });
}
