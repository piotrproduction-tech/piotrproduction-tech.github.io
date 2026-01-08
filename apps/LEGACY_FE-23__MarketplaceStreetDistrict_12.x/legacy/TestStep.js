/**
 * CITYOF-GATE — TestStep Model
 */

export const TestStep = {
  id: "",
  trigger: { type: "", value: null },
  action: { event: "", payload: {} },
  effect: { stateChange: {}, reputationChange: 0, tokenChange: 0 },
  visual: { overlay: "", highlight: "", message: "" },
  priority: 0,
  duration: 0
};
