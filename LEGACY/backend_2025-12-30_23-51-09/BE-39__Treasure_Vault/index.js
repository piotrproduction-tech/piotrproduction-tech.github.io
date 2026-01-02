import * as service from "./service.js";
import { registerVaultRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerVaultRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerVaultRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerVaultRoutes,
  registerVaultRoutesV3,
  registerVaultRoutesV4
};
