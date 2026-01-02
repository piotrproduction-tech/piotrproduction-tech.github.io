import * as service from "./service.js";
import * as serviceV4 from "./service.extV4.js";

import { registerTreasureVaultRoutes } from "./routes.js";
import { registerTreasureVaultRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV4,
  registerTreasureVaultRoutes,
  registerTreasureVaultRoutesV4
};
