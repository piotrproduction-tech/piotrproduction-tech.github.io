import React from "react";

export function BE_03Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_03(event) {
  pushCityNotification({
    title: "Community And Social",
    message: "Nowe zdarzenie: " + event.type
  });
}
