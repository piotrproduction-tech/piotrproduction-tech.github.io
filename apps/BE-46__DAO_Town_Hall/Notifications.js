import React from "react";

export function BE_46Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_46(event) {
  pushCityNotification({
    title: "DAO Town Hall",
    message: "Nowe zdarzenie: " + event.type
  });
}
