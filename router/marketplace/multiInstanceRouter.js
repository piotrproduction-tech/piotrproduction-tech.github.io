/**
 * Marketplace Multi-Instance Router 5.0
 */

export const MarketplaceMultiInstanceRouter = {
  instances: {},

  registerInstance(id, ref) {
    this.instances[id] = ref;
    return { registered: true, id };
  },

  route(instanceId, action, payload) {
    const inst = this.instances[instanceId];
    if (!inst) return { error: "Instance not found" };
    if (typeof inst[action] !== "function") return { error: "Action not found" };
    return inst[action](payload);
  }
};