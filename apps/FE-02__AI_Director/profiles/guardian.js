import { DirectorProfile } from "../models/directorProfile.js";

export const GuardianProfile = new DirectorProfile({
  id: "guardian",
  name: "Guardian Director",
  style: "stabilizer",
  priorityWeights: { dropOff: 5, engagement: 4 },
  triggerSensitivity: { dropOff: 70 },
  preferredActions: ["DROP_OFF_ALERT", "RESCUE_EVENT", "ENGAGEMENT_RECOVERY"],
  decisionMatrix: [
    {
      condition: (insights, profile) => {
        const alerts = insights.dropOffAlerts || [];
        return alerts.some(a => a.dropOffAtPercent < profile.triggerSensitivity.dropOff);
      },
      action: (insights) => ({
        type: "DROP_OFF_ALERT",
        priority: 1,
        weightKey: "dropOff",
        payload: insights.dropOffAlerts[0]
      })
    }
  ]
});