import React, { useEffect, useState } from "react";
import { getAdminOverview } from "../festivalApi.js";

export default function FestivalAdminPanel() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAdminOverview();
      setOverview(res);
    })();
  }, []);

  if (!overview) return <div>Ładowanie panelu administracyjnego...</div>;

  return (
    <div>
      <h2>Panel administracyjny festiwalu</h2>
      <p>Łączna liczba zgłoszeń: {overview.totalSubmissions}</p>
      <p>Wybrane: {overview.selected}</p>
      <p>Odrzucone: {overview.rejected}</p>
      <p>W trakcie oceny: {overview.inReview}</p>
    </div>
  );
}
