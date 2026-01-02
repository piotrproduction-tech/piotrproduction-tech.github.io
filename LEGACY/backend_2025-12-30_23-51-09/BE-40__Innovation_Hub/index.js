import * as service from "./service.js";
import { registerInnovationRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerInnovationRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerInnovationRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerInnovationRoutes,
  registerInnovationRoutesV3,
  registerInnovationRoutesV4
};
