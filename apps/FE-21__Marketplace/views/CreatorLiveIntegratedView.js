// FE-21__Marketplace - views/CreatorLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import CreatorAdvancedView from "./CreatorAdvancedView";

export default function CreatorLiveIntegratedView() {
  const live = useSuperEngine();
  return <CreatorAdvancedView creator={live.creator} />;
}
