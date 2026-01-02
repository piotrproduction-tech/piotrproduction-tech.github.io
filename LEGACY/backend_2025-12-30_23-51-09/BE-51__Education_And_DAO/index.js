import * as service from "./service.js";
import { registerEducationRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerEducationRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerEducationRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerEducationRoutes,
  registerEducationRoutesV3,
  registerEducationRoutesV4
};
