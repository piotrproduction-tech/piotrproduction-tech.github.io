// FE-21__Marketplace - views/CreatorAdvancedView.js

import CreatorShowcase from "../components/CreatorShowcase";
import CreatorAchievementsGrid from "../components/CreatorAchievementsGrid";
import CreatorLevelLadder from "../components/CreatorLevelLadder";
import CreatorFestivalPanel from "../components/CreatorFestivalPanel";
import CreatorTimelineAdvanced from "../components/CreatorTimelineAdvanced";
import CreatorStatsPanel from "../components/CreatorStatsPanel";

export default function CreatorAdvancedView({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-advanced-view">
      <CreatorStatsPanel stats={creator.stats} />
      <CreatorShowcase showcase={creator.showcase} />
      <CreatorAchievementsGrid achievements={creator.achievements} />
      <CreatorLevelLadder ladder={creator.ladder} />
      <CreatorFestivalPanel festival={creator.festival} />
      <CreatorTimelineAdvanced timeline={creator.timeline} />
    </div>
  );
}
