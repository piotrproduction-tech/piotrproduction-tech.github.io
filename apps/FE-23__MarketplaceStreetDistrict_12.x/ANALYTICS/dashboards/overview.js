export function buildAnalyticsOverview({ analyticsEngine }) {
    const now = Date.now();
    const lastMinute = now - 60_000;

    const recentEvents = analyticsEngine.getEvents({ since: lastMinute });

    return {
      totalEvents: recentEvents.length,
      byType: recentEvents.reduce((acc, e) => {
        acc[e.event] = (acc[e.event] || 0) + 1;
        return acc;
      }, {})
    };
  }

