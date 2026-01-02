import * as service from "./service.js";
import * as serviceV4 from "./service.extV4.js";

import { registerBudgetRoutes } from "./routes.js";
import { registerBudgetRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV4,
  registerBudgetRoutes,
  registerBudgetRoutesV4
};
