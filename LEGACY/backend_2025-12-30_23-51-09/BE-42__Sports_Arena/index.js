import * as service from "./service.js";
import * as serviceV3 from "./service.extV3.js";
import * as serviceV4 from "./service.extV4.js";

import { registerSportsArenaRoutes } from "./routes.js";
import { registerSportsArenaRoutesV3 } from "./routes.extV3.js";
import { registerSportsArenaRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerSportsArenaRoutes,
  registerSportsArenaRoutesV3,
  registerSportsArenaRoutesV4
};
