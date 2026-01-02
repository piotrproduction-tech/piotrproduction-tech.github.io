import * as service from "./service.js";
import { registerCitizenRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerCitizenRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerCitizenRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerCitizenRoutes,
  registerCitizenRoutesV3,
  registerCitizenRoutesV4
};
