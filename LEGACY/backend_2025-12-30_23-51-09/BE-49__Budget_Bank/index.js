import * as service from "./service.js";
import { registerBudgetRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerBudgetRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerBudgetRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerBudgetRoutes,
  registerBudgetRoutesV3,
  registerBudgetRoutesV4
};
