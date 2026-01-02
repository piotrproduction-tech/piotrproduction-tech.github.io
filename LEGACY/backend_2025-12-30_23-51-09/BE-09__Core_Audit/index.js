import * as service from "./service.js";
import { registerAuditRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerAuditRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerAuditRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerAuditRoutes,
  registerAuditRoutesV3,
  registerAuditRoutesV4
};
