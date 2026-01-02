import { cityBroadcast } from "./cityBroadcastEngine";
import { citySync } from "../sync/citySyncEngine";

citySync.subscribe(event => {
  const prefix = event.type.split(".")[0];

  const messages = {
    marketplace: "Nowa aktywność w Marketplace!",
    creator: "Twórca zdobył progres!",
    street: "Nowy sygnał ulicy!",
    festival: "Nowy event festiwalowy!",
    community: "Aktywność społeczności!",
    city: "Globalne wydarzenie miasta!"
  };

  const msg = messages[prefix] || "Nowy event w mieście!";
  cityBroadcast.push(msg);
});