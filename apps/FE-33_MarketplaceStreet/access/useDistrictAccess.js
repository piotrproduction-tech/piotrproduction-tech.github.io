import { evaluateDistrictAccess } from "./accessEvaluator";

export function useDistrictAccess(user) {
  return {
    can: (action) => evaluateDistrictAccess(user, action)
  };
}
