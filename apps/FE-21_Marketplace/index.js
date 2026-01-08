import React from "react";
import DistrictList from "./PANELS/DistrictList.jsx";
import DistrictDetails from "./PANELS/DistrictDetails.jsx";
import DistrictMainForm from "./FORMS/DistrictMainForm.jsx";

export const DistrictModule = {
  config: {
    id: "FE-21",
    name: "Marketplace",
    baseRoute: "/district"
  },

  router: (route) => {
    if (route === "/district") return <DistrictList />;
    if (route === "/district/new") return <DistrictMainForm />;
    if (route.startsWith("/district/item/")) {
      const id = route.split("/").pop();
      return <DistrictDetails itemId={id} />;
    }
    return <div>Nie znaleziono strony DZIELNICY: {route}</div>;
  }
};
