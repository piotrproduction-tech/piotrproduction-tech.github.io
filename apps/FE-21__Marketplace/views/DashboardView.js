// FE-21__Marketplace - views/DashboardView.js

import DashboardStatsOverview from "../components/DashboardStatsOverview";
import DashboardActivityChart from "../components/DashboardActivityChart";
import DashboardTransactionHistory from "../components/DashboardTransactionHistory";
import DashboardReviewHistory from "../components/DashboardReviewHistory";
import DashboardCreatorProgressHistory from "../components/DashboardCreatorProgressHistory";
import DashboardStreetSignalHistory from "../components/DashboardStreetSignalHistory";

export default function DashboardView({ dashboard }) {
  if (!dashboard) return null;

  return (
    <div className="dashboard-view">
      <DashboardStatsOverview stats={dashboard.stats} />
      <DashboardActivityChart activity={dashboard.activity} />
      <DashboardTransactionHistory transactions={dashboard.transactions} />
      <DashboardReviewHistory reviews={dashboard.reviews} />
      <DashboardCreatorProgressHistory progress={dashboard.creatorProgress} />
      <DashboardStreetSignalHistory signals={dashboard.streetSignals} />
    </div>
  );
}
