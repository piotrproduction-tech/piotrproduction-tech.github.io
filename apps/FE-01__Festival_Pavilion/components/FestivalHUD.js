


// FE_FESTIVAL_HUD_COMPONENT
// Live HUD for Festival Pavilion — pulse, mood, wave, reputation, identity, access

import React from "react";
import "./FestivalHUD.css";

export function FestivalHUD({ pulse, mood, wave, reputation, identity, access }) {
  const avatar = identity?.avatar || "/default-avatar.png";
  const name = identity?.profile?.name || "Unknown";
  const badges = identity?.badges || [];
  const level = reputation?.level || 0;
  const trust = reputation?.trustLevel || "medium";

  return (
    <div className={"festival-hud mood-" + mood}>
      <div className="hud-left">
        <img className="hud-avatar" src={avatar} alt="avatar" />
        <div className="hud-user">
          <div className="hud-name">{name}</div>
          <div className="hud-badges">
            {badges.map((b) => (
              <span key={b} className="hud-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hud-center">
        <div className="hud-item">Pulse: {pulse} BPM</div>
        <div className="hud-item">Mood: {mood}</div>
        <div className="hud-item">Wave: {wave?.label || "—"}</div>
        <div className="hud-item">Reputation: {reputation?.points || 0}</div>
        <div className="hud-item">Level: {level}</div>
      </div>

      <div className="hud-right">
        <div className="hud-access">
          <pre>{JSON.stringify(access, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
