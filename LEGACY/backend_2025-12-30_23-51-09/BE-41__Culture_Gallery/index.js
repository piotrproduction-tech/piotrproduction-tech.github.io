import * as service from "./service.js";
import { registerCultureRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerCultureRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerCultureRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerCultureRoutes,
  registerCultureRoutesV3,
  registerCultureRoutesV4
};
