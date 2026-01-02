


// FE_FESTIVAL_ACCESS_HOOK
// React hook for evaluating access in real time

import { useState, useEffect } from "react";
import { evaluateFestivalAccess } from "../access/accessEvaluator";

export function useFestivalAccess(identity, governance, security) {
  const [access, setAccess] = useState({});

  useEffect(() => {
    const a = evaluateFestivalAccess(identity, governance, security);
    setAccess(a);
  }, [identity, governance, security]);

  return access;
}
