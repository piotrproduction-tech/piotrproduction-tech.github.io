import * as service from "./service.js";
import { registerCourseGovRoutes } from "./routes.js";

import * as serviceV3 from "./service.extV3.js";
import { registerCourseGovRoutesV3 } from "./routes.extV3.js";

import * as serviceV4 from "./service.extV4.js";
import { registerCourseGovRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerCourseGovRoutes,
  registerCourseGovRoutesV3,
  registerCourseGovRoutesV4
};
