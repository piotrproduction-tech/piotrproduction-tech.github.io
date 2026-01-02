// FE-21__Marketplace - views/CreatorView.js

import CreatorProfile from "../components/CreatorProfile";
import CreatorPortfolio from "../components/CreatorPortfolio";
import CreatorAchievements from "../components/CreatorAchievements";
import CreatorLevels from "../components/CreatorLevels";
import CreatorTimeline from "../components/CreatorTimeline";

export default function CreatorView({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-view">
      <CreatorProfile creator={creator} />
      <CreatorLevels progress={creator.progress} />
      <CreatorPortfolio portfolio={creator.portfolio} />
      <CreatorAchievements achievements={creator.achievements} />
      <CreatorTimeline timeline={creator.timeline} />
    </div>
  );
}
