// FE-21__Marketplace - components/RTRAAnimation.js

import { useEffect, useState } from "react";

export default function RTRAAnimation({ reputationDelta, tokensDelta }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reputationDelta !== 0 || tokensDelta !== 0) {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    }
  }, [reputationDelta, tokensDelta]);

  if (!visible) return null;

  return (
    <div className="rtra-animation">
      {reputationDelta !== 0 && (
        <div className="rep-change">
          Reputation: {reputationDelta > 0 ? "+" : ""}{reputationDelta}
        </div>
      )}
      {tokensDelta !== 0 && (
        <div className="token-change">
          Tokens: {tokensDelta > 0 ? "+" : ""}{tokensDelta}
        </div>
      )}
    </div>
  );
}
