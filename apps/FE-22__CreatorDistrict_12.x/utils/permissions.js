import roles from "../access/roles.json" assert { type: "json" };
  import permissions from "../access/permissions.json" assert { type: "json" };

  export function hasAccess(user, permission) {
    if (!user || !user.role) return false;
    const allowedRoles = permissions[permission] || [];
    return allowedRoles.includes(user.role);
  }

  export function describeRole(role) {
    return roles[role] || { label: role, description: "Unknown role" };
  }

