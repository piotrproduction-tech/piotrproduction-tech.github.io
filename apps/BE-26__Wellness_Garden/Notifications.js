import React from "react";

export function BE_26Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_26(event) {
  pushCityNotification({
    title: "Wellness Garden",
    message: "Nowe zdarzenie: " + event.type
  });
}
