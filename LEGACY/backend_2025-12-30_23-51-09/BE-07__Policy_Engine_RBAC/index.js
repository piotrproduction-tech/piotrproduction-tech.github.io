import * as service from "./service.js";
import { registerProfileRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerProfileRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerProfileRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerProfileRoutes,
  registerProfileRoutesV3,
  registerProfileRoutesV4
};
