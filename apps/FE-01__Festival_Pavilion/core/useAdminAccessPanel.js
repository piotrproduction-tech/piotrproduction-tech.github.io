


// FE_FESTIVAL_ADMIN_ACCESS_HOOK
// Hook for AdminAccessPanel integration

import { useUserCardData } from "./useUserCardData";

export function useAdminAccessPanel(identity, governance, security) {
  const usercard = useUserCardData(identity, governance, security);
  return usercard;
}
