


// FE_FESTIVAL_ACCESS_EVALUATOR
// Evaluates final permissions for a user

import { FestivalAccessMatrix } from "./accessMatrix";

export function evaluateFestivalAccess(identity, governance, security) {
  const role = governance?.roles?.[0] || "viewer";
  const trust = security?.trustLevel || "medium";
  const certs = governance?.certifications || [];

  let base = { ...FestivalAccessMatrix.roles[role] };
  let trustMod = FestivalAccessMatrix.trust[trust] || {};
  let certMod = {};

  certs.forEach(c => {
    if (FestivalAccessMatrix.certifications[c]) {
      certMod = { ...certMod, ...FestivalAccessMatrix.certifications[c] };
    }
  });

  return {
    ...base,
    ...trustMod,
    ...certMod
  };
}
