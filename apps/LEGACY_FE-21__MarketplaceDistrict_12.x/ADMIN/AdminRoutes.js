export function registerAdminRoutes({ registry }) {
    registry.registerModule("admin:routes", {
      getRoutes() {
        return [
          {
            path: "/admin",
            component: "AdminPanel",
            secure: true
          }
        ];
      }
    });
  }

