import React from "react";

export function BE_33Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_33(event) {
  pushCityNotification({
    title: "Marketplace Street",
    message: "Nowe zdarzenie: " + event.type
  });
}
