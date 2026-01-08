export function evaluateDistrictAccess(user, action) {
  const roles = user.roles?.perModule?.["FE-21"] || [];
  for (const role of roles) {
    const allowed = DistrictAccessMatrix[role];
    if (allowed?.includes("*") || allowed?.includes(action)) {
      return true;
    }
  }
  return false;
}
