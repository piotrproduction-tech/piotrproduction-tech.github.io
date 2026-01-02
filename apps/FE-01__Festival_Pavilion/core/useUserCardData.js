


// FE_FESTIVAL_USERCARD_DATA_HOOK
// Combines identity + governance + security + access into one object

import { useFestivalAccess } from "./useFestivalAccess";

export function useUserCardData(identity, governance, security) {
  const access = useFestivalAccess(identity, governance, security);

  return {
    identity,
    governance,
    security,
    access
  };
}
