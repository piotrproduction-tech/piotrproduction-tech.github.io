


// FE_FESTIVAL_USERCARD_COMPONENT
// Live identity + badges + access widget

import React from "react";

export function UserCard({ identity, governance, security, access }) {
  if (!identity) return null;

  const avatar = identity.avatar || "/default-avatar.png";
  const name = identity.profile?.name || "Unknown User";
  const handle = identity.profile?.handle || "";
  const badges = identity.badges || [];
  const roles = governance?.roles || [];
  const trust = security?.trustLevel || "medium";

  return (
    <div className="usercard">
      <div className="usercard-avatar">
        <img src={avatar} alt="avatar" />
      </div>

      <div className="usercard-info">
        <div className="usercard-name">{name}</div>
        <div className="usercard-handle">@{handle}</div>

        <div className="usercard-roles">
          {roles.map((r) => (
            <span key={r} className="usercard-role">{r}</span>
          ))}
        </div>

        <div className="usercard-badges">
          {badges.map((b) => (
            <span key={b} className="usercard-badge">{b}</span>
          ))}
        </div>

        <div className="usercard-trust trust-" + {trust}>
          Trust: {trust}
        </div>

        <div className="usercard-access">
          <pre>{JSON.stringify(access, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
