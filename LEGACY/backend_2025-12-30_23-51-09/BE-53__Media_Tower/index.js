import * as service from "./service.js";
import { registerMediaRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerMediaRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerMediaRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerMediaRoutes,
  registerMediaRoutesV3,
  registerMediaRoutesV4
};
