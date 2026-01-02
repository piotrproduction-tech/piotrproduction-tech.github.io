import * as service from "./service.js";
import { registerStudioRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerStudioRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerStudioRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerStudioRoutes,
  registerStudioRoutesV3,
  registerStudioRoutesV4
};
