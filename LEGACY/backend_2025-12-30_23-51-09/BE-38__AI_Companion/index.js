import * as service from "./service.js";
import * as analytics from "./service.analytics.js";
import * as recommend from "./service.recommend.js";
import * as integrations from "./service.integrations.js";

import { registerAIRoutes } from "./routes.js";
import { registerAIAnalyticsRoutes } from "./routes.analytics.js";
import { registerAIRecommendRoutes } from "./routes.recommend.js";
import { registerAIIntegrationRoutes } from "./routes.integrations.js";

export {
  service,
  analytics,
  recommend,
  integrations,
  registerAIRoutes,
  registerAIAnalyticsRoutes,
  registerAIRecommendRoutes,
  registerAIIntegrationRoutes
};
