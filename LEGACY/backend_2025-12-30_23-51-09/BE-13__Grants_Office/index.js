// backend/BE-13/index.js

import * as service from "./service.js";
import { registerConfigRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerConfigRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerConfigRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerConfigRoutes,
  registerConfigRoutesV3,
  registerConfigRoutesV4,
};
