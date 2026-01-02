import * as service from "./service.js";
import { registerSponsoringRoutes } from "./routes.js";

export { service, registerSponsoringRoutes };
import * as service from "./service.js";
import { registerSponsorRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerSponsorRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerSponsorRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerSponsorRoutes,
  registerSponsorRoutesV3,
  registerSponsorRoutesV4
};
