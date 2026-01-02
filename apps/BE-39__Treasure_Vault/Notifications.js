import React from "react";

export function BE_39Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}



import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notifyBE_39(event) {
  pushCityNotification({
    title: "Treasure Vault",
    message: "Nowe zdarzenie: " + event.type
  });
}
