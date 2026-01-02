import * as service from "./service.js";
import * as serviceV3 from "./service.extV3.js";
import * as serviceV4 from "./service.extV4.js";

import { registerFestivalRoutes } from "./routes.js";
import { registerFestivalRoutesV3 } from "./routes.extV3.js";
import { registerFestivalRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerFestivalRoutes,
  registerFestivalRoutesV3,
  registerFestivalRoutesV4
};
