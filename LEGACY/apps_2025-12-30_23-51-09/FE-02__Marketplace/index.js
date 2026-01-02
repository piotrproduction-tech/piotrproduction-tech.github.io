import React from "react";
import MainPanel from "./panels/MainPanel.jsx";
import DetailsPanel from "./panels/DetailsPanel.jsx";
import FormPanel from "./FORMS/FormPanel.jsx";
import AdminPanel from "./ADMIN/AdminPanel.jsx";
import AIPanel from "./AI/AIPanel.jsx";
import JuryPanel from "./JURY/JuryPanel.jsx";

export const FE_02__MarketplaceModule = {
  config: {
    id: "FE-02",
    name: "Marketplace",
    baseRoute: "/marketplace"
  },

  router: (route) => {
    if (route === "/marketplace") return <MainPanel />;
    if (route === "/marketplace/new") return <FormPanel />;

    if (route.startsWith("/marketplace/item/")) {
      const id = route.split("/").pop();
      return <DetailsPanel itemId={id} />;
    }

    if (route === "/marketplace/admin") return <AdminPanel />;
    if (route === "/marketplace/ai") return <AIPanel />;
    if (route === "/marketplace/jury") return <JuryPanel />;

    return (
      <div>
        <h2>FE-02__Marketplace</h2>
        <p>Nie znaleziono strony modułu dla ścieżki: {route}</p>
      </div>
    );
  },

  panels: {
    MainPanel,
    DetailsPanel,
    FormPanel,
    AdminPanel,
    AIPanel,
    JuryPanel
  }
};
