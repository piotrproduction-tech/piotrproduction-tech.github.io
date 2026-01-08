/**
 * CITY MULTI‑DISTRICT ROUTER BRIDGE
 * Routing między dzielnicami → Marketplace
 */

export const CityRouterBridge = {
  routeToMarketplace(request, router) {
    // CITY_ROUTER_STABILITY_PATCH
    if (!router || typeof router.route !== "function") {
      return { district: "marketplace", handled: false, error: "RouterMissing" };
    }
    return router.route("marketplace", request);
  }
};