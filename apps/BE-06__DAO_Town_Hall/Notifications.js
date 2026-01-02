import React from "react";

export function BE_06Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_06(event) {
  pushCityNotification({
    title: "DAO Town Hall",
    message: "Nowe zdarzenie: " + event.type
  });
}
