import * as service from "./service.js";
import * as serviceV3 from "./service.extV3.js";
import * as serviceV4 from "./service.extV4.js";

import { registerKnowledgeRoutes } from "./routes.js";
import { registerKnowledgeRoutesV3 } from "./routes.extV3.js";
import { registerKnowledgeRoutesV4 } from "./routes.extV4.js";

export {
  service,
  serviceV3,
  serviceV4,
  registerKnowledgeRoutes,
  registerKnowledgeRoutesV3,
  registerKnowledgeRoutesV4
};
