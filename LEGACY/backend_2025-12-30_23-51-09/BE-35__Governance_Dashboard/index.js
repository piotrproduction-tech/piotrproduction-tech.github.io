import * as service from "./service.js";
import { registerGovernanceRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerGovernanceRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerGovernanceRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerGovernanceRoutes,
  registerGovernanceRoutesV3,
  registerGovernanceRoutesV4
};
