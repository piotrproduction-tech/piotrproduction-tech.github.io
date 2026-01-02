import * as service from "./service.js";
import { registerAdminRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerAdminRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerAdminRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerAdminRoutes,
  registerAdminRoutesV3,
  registerAdminRoutesV4
};
