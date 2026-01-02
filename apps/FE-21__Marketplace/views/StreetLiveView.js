// FE-21__Marketplace - views/StreetLiveView.js

import LiveSignalPulse from "../components/LiveSignalPulse";
import LiveEventBubble from "../components/LiveEventBubble";
import LiveStorefrontActivity from "../components/LiveStorefrontActivity";
import LiveCreatorSignal from "../components/LiveCreatorSignal";

export default function StreetLiveView({ live }) {
  if (!live) return null;

  return (
    <div className="street-live-view">
      <LiveSignalPulse active={live.active} />
      <LiveEventBubble event={live.event} />
      <LiveStorefrontActivity activity={live.storefrontActivity} />
      <LiveCreatorSignal creator={live.creator} />
    </div>
  );
}
