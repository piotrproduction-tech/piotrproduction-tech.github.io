/**
 * Marketplace API — Events (5.0)
 */

export default {
  async list(req, res) {
    res.json([]);
  },

  async trigger(req, res) {
    res.json({ triggered: true });
  }
};