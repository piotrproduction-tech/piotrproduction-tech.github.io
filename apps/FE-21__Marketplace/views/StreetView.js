// FE-21__Marketplace - views/StreetView.js

import StreetFeed from "../components/StreetFeed";
import StreetStorefront from "../components/StreetStorefront";
import StreetGallery from "../components/StreetGallery";

export default function StreetView({ street }) {
  return (
    <div className="street-view">
      <StreetFeed events={street?.events} />
      <StreetStorefront seller={street?.seller} />
      <StreetGallery creator={street?.creator} />
    </div>
  );
}
