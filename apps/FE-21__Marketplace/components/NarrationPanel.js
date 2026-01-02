// FE-21__Marketplace - components/NarrationPanel.js

import Badge from "./Badge";
import RoleTag from "./RoleTag";
import LevelIndicator from "./LevelIndicator";
import CreatorProgress from "./CreatorProgress";
import RTRAAnimation from "./RTRAAnimation";

export default function NarrationPanel({ life }) {
  if (!life) return null;

  const { roles, levels, badges, rewards, rtra, creatorProgress } = life;

  return (
    <div className="narration-panel">
      <h2>Your Marketplace Life</h2>

      <div className="roles">
        {roles?.map((r, i) => <RoleTag key={i} role={r} />)}
      </div>

      <div className="levels">
        {Object.entries(levels || {}).map(([k, v]) => (
          <LevelIndicator key={k} level={v} />
        ))}
      </div>

      <div className="badges">
        {badges?.map((b, i) => <Badge key={i} label={b} />)}
      </div>

      <div className="rewards">
        {rewards?.map((r, i) => <Badge key={i} label={r} />)}
      </div>

      <CreatorProgress progress={creatorProgress} />

      <RTRAAnimation
        reputationDelta={rtra?.reputationDelta}
        tokensDelta={rtra?.tokensDelta}
      />
    </div>
  );
}
