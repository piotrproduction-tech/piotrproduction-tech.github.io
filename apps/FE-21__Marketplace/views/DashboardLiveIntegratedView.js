// FE-21__Marketplace - views/DashboardLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import DashboardView from "./DashboardView";

export default function DashboardLiveIntegratedView() {
  const live = useSuperEngine();

  const dashboard = {
    stats: {
      totalSales: live.street.events.length,
      totalRevenue: live.street.events.length * 10,
      totalReviews: live.creator.timeline.length,
      reputation: live.creator.progress?.reputation || 0
    },
    activity: live.street.events.map((e, i) => ({ value: i + 1 })),
    transactions: live.street.events.map(e => ({
      title: e.type,
      amount: 10,
      date: new Date().toISOString()
    })),
    reviews: [],
    creatorProgress: live.creator.timeline,
    streetSignals: live.street.events
  };

  return <DashboardView dashboard={dashboard} />;
}
