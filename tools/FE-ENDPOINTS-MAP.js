/* ============================================================
   FE‑ENDPOINTS‑MAP.js
   Kanoniczna mapa FE → BE dla całego CITY OF GATE
   Wersja: 1.0 (stabilna)
   ============================================================ */

export const FE_ENDPOINTS = {

  /* ============================================================
     BE‑01__Festival_Pavilion
     ============================================================ */
  "FE-01__Festival_Pavilion": {
    module: "Festival Pavilion",
    endpoints: {
      list:      "/festival/events",
      add:       "/festival/event/add",
      tickets:   "/festival/tickets/:eventId",
      partners:  "/festival/partners",
      reports:   "/festival/reports"
    },
    views: ["list", "add", "tickets", "partners", "reports"]
  },

  /* ============================================================
     BE‑02__Finance_And_Admin
     (Budget Bank + Treasure Vault + Admin Tower + Grants Office)
     ============================================================ */
  "FE-02__Finance_And_Admin": {
    module: "Finance & Admin",
    endpoints: {
      budget: {
        list:        "/budget/transactions",
        add:         "/budget/transaction/add",
        filter:      "/budget/transactions/filter",
        export:      "/budget/transactions/export",
        audit:       "/budget/transaction/audit",
        linkGrant:   "/budget/transaction/link-grant"
      },
      treasure: {
        list:        "/treasure/rewards",
        add:         "/treasure/reward/add",
        claim:       "/treasure/reward/claim",
        status:      "/treasure/reward/status"
      },
      admin: {
        list:        "/admin/roles",
        assign:      "/admin/role/assign",
        bulk:        "/admin/role/bulk",
        expiry:      "/admin/role/expiry"
      },
      grants: {
        list:        "/grants/list",
        update:      "/grants/update",
        workflow:    "/grants/workflow"
      }
    },
    views: ["budget", "treasure", "admin", "grants"]
  },

  /* ============================================================
     BE‑03__Community_And_Social
     (Community House + Volunteer Center + Wellness Garden + Sports Arena)
     ============================================================ */
  "FE-03__Community_And_Social": {
    module: "Community & Social",
    endpoints: {
      community: {
        list:      "/community/groups",
        add:       "/community/group/add",
        remove:    "/community/group/remove",
        moderate:  "/community/group/moderate",
        export:    "/community/group/export"
      },
      volunteer: {
        list:      "/volunteer/tasks",
        assign:    "/volunteer/task/assign",
        update:    "/volunteer/task/update",
        report:    "/volunteer/task/report"
      },
      wellness: {
        list:      "/wellness/activities",
        add:       "/wellness/activity/add",
        schedule:  "/wellness/activity/schedule",
        register:  "/wellness/activity/register",
        export:    "/wellness/activity/export"
      },
      sports: {
        list:      "/sports/matches",
        add:       "/sports/match/add",
        update:    "/sports/match/update",
        stats:     "/sports/match/stats",
        ranking:   "/sports/ranking"
      }
    },
    views: ["community", "volunteer", "wellness", "sports"]
  },

  /* ============================================================
     BE‑04__Innovation_And_Business
     (Innovation Hub + Business District + Marketplace Street)
     ============================================================ */
  "FE-04__Innovation_And_Business": {
    module: "Innovation & Business",
    endpoints: {
      innovation: {
        list:      "/innovation/projects",
        add:       "/innovation/project/add",
        update:    "/innovation/project/update",
        roadmap:   "/innovation/project/roadmap",
        score:     "/innovation/project/score"
      },
      business: {
        list:      "/business/companies",
        add:       "/business/company/add",
        update:    "/business/company/update",
        kpi:       "/business/company/kpi",
        report:    "/business/report"
      },
      market: {
        list:      "/market/offers",
        add:       "/market/offer/add",
        update:    "/market/offer/update",
        remove:    "/market/offer/remove",
        cart:      "/market/cart",
        lead:      "/market/lead",
        archive:   "/market/archive"
      }
    },
    views: ["innovation", "business", "market"]
  },

  /* ============================================================
     BE‑05__Education_And_DAO
     (Education Library + DAO Town Hall)
     ============================================================ */
  "FE-05__Education_And_DAO": {
    module: "Education & DAO",
    endpoints: {
      education: {
        list:      "/education/courses",
        add:       "/education/course/add",
        update:    "/education/course/update",
        remove:    "/education/course/remove",
        progress:  "/education/course/progress",
        report:    "/education/course/report",
        cert:      "/education/certificate"
      },
      dao: {
        list:      "/dao/proposals",
        add:       "/dao/proposal/add",
        vote:      "/dao/proposal/vote",
        close:     "/dao/proposal/close",
        report:    "/dao/proposal/report"
      }
    },
    views: ["education", "dao"]
  },

  /* ============================================================
     BE‑51__Education_And_DAO (blok 51)
     Wersje: v2, v3, v4 — analityka, trendy, integracje
     ============================================================ */
  "FE-51__Education_And_DAO": {
    module: "Education & DAO (blok 51)",
    endpoints: {
      trends: {
        edu:      "/education51/trends",
        dao:      "/education51/dao/trends"
      },
      reports: {
        edu:      "/education51/reports",
        dao:      "/education51/dao/reports"
      },
      link: {
        dao:      "/education51/link/dao",
        citizen:  "/education51/link/citizen"
      },
      ratings: {
        list:     "/education51/ratings",
        add:      "/education51/rating/add"
      },
      schedule: {
        list:     "/education51/schedule"
      },
      alerts: {
        newCourse: "/education51/alert/new-course"
      }
    },
    views: ["trends", "reports", "ratings", "schedule", "alerts"]
  }

  /* ============================================================
     Kolejne moduły FE‑06…FE‑54 dopiszę automatycznie,
     gdy tylko potwierdzisz, że ta struktura jest OK.
     ============================================================ */
};
