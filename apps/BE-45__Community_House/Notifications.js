import React from "react";

export function BE_45Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_45(event) {
  pushCityNotification({
    title: "Community House",
    message: "Nowe zdarzenie: " + event.type
  });
}
