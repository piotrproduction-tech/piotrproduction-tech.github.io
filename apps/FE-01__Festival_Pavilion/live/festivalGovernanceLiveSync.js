


// FE_FESTIVAL_GOVERNANCE_LIVE_SYNC
// Live sync for Festival Pavilion — roles, certifications, permissions

import { onGovernanceEvent } from "../core/governanceBus";

export function attachFestivalGovernanceLiveSync(callback) {
  // callback({ userId, roles, certifications, permissions }) → FE should update UI
  onGovernanceEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        roles: event.payload.roles,
        certifications: event.payload.certifications,
        permissions: event.payload.permissions
      });
    }
  });
}
