import React from "react";

export function BE_27Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_27(event) {
  pushCityNotification({
    title: "Sports Arena",
    message: "Nowe zdarzenie: " + event.type
  });
}
