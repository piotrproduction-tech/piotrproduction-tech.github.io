


// FE_FESTIVAL_ACCESS_MATRIX
// Central access matrix for Festival Pavilion

export const FestivalAccessMatrix = {
  roles: {
    viewer: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    participant: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    creator: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    certifiedCreator: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    jury: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: true,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    admin: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: true,
      canAssignJury: true,
      canCreateAwards: true,
      canManageEvents: true
    }
  },

  // trust-level modifiers
  trust: {
    low: {
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    medium: {},
    high: {}
  },

  // certification modifiers
  certifications: {
    "festival_badge": {
      canVote: true
    },
    "jury_certified": {
      canVote: true,
      canAssignJury: true
    },
    "creator_certified": {
      canCreateAwards: true
    }
  }
};
