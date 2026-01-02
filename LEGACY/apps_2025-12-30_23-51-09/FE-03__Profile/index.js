import React from "react";
import MainPanel from "./panels/MainPanel.jsx";
import DetailsPanel from "./panels/DetailsPanel.jsx";
import FormPanel from "./FORMS/FormPanel.jsx";
import AdminPanel from "./ADMIN/AdminPanel.jsx";
import AIPanel from "./AI/AIPanel.jsx";
import JuryPanel from "./JURY/JuryPanel.jsx";

export const FE_03__ProfileModule = {
  config: {
    id: "FE-03",
    name: "Profile",
    baseRoute: "/profile"
  },

  router: (route) => {
    if (route === "/profile") return <MainPanel />;
    if (route === "/profile/new") return <FormPanel />;

    if (route.startsWith("/profile/item/")) {
      const id = route.split("/").pop();
      return <DetailsPanel itemId={id} />;
    }

    if (route === "/profile/admin") return <AdminPanel />;
    if (route === "/profile/ai") return <AIPanel />;
    if (route === "/profile/jury") return <JuryPanel />;

    return (
      <div>
        <h2>FE-03__Profile</h2>
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
