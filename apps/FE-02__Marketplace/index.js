import React from "react";

// Importy paneli – do uzupełnienia per moduł
// import MainPanel from "./PANELS/MainPanel.jsx";
// import DetailsPanel from "./PANELS/DetailsPanel.jsx";
// import FormPanel from "./FORMS/FormPanel.jsx";
// import AdminPanel from "./ADMIN/AdminPanel.jsx";
// import AIPanel from "./AI/AIPanel.jsx";
// import JuryPanel from "./JURY/JuryPanel.jsx";

import { MarketplaceListPanel } from "./PANELS/MarketplaceListPanel";

export const FE_02_Module = {

  config: {
    id: "FE-02",
    name: "Marketplace",
    baseRoute: "/marketplace"
  },

  router: (route) => {
    // Przykładowy szkic routingu – dostosuj per moduł
    if (route === "/marketplace") {
      return <div>Marketplace – główny panel (do uzupełnienia)</div>;
    }

    if (route === "/marketplace/new") {
      return <div>Marketplace – formularz (do uzupełnienia)</div>;
    }

    if (route.startsWith("/marketplace/item/")) {
      const id = route.split("/").pop();
      return (
        <div>
          Marketplace – szczegóły elementu {id} (do uzupełnienia)
        </div>
      );
    }

    if (route === "/marketplace/admin") {
      return <div>Marketplace – panel admina (do uzupełnienia)</div>;
    }

    if (route === "/marketplace/ai") {
      return <div>Marketplace – panel AI (do uzupełnienia)</div>;
    }

    if (route === "/marketplace/jury") {
      return <div>Marketplace – panel jury (do uzupełnienia)</div>;
    }

    return (
      <div>
        <h2>Marketplace</h2>
        <p>Nie znaleziono strony modułu dla ścieżki: {route}</p>
      </div>
    );
  }
};
