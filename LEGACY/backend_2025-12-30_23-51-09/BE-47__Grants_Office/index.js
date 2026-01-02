import * as service from "./service.js";
import { registerGrantsRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerGrantsRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerGrantsRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerGrantsRoutes,
  registerGrantsRoutesV3,
  registerGrantsRoutesV4
};
