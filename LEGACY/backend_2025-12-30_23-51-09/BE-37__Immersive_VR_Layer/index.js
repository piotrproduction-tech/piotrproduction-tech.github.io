import * as service from "./service.js";
import { registerVRRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerVRRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerVRRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerVRRoutes,
  registerVRRoutesV3,
  registerVRRoutesV4
};
