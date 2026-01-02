import * as service from "./service.js";
import { registerWellnessRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerWellnessRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerWellnessRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerWellnessRoutes,
  registerWellnessRoutesV3,
  registerWellnessRoutesV4
};
