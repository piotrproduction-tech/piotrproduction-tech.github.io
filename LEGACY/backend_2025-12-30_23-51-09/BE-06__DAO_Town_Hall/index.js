import * as service from "./service.js";
import { registerDAORoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerDAORoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerDAORoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerDAORoutes,
  registerDAORoutesV3,
  registerDAORoutesV4
};
