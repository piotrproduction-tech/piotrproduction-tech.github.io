// FE-21__Marketplace - views/StreetLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import StreetLiveView from "./StreetLiveView";

export default function StreetLiveIntegratedView() {
  const live = useSuperEngine();
  return <StreetLiveView street={live.street} />;
}
