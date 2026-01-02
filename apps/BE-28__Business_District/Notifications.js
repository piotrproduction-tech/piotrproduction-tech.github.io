import React from "react";

export function BE_28Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_28(event) {
  pushCityNotification({
    title: "Business District",
    message: "Nowe zdarzenie: " + event.type
  });
}
