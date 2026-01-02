import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/report.js": `
export class Report {
  constructor({
    id,
    reporterId,
    targetType,
    targetId,
    festivalId,
    reason,
    description,
    status,
    createdAt,
    resolvedAt
  }) {
    this.id = id;
    this.reporterId = reporterId;

    this.targetType = targetType;
    // "user" | "review" | "activity" | "film" | "event" | "festival" | "collection"

    this.targetId = targetId;
    this.festivalId = festivalId || null;

    this.reason = reason;
    // "abuse" | "spam" | "hate" | "copyright" | "misinfo" | "other"

    this.description = description || null;

    this.status = status || "pending";
    // "pending" | "reviewed" | "action_taken" | "dismissed"

    this.createdAt = createdAt || new Date().toISOString();
    this.resolvedAt = resolvedAt || null;
  }
}
`,

  // ENGINE
  "engine/moderationEngine.js": `
import { Report } from "../models/report.js";

export class ModerationEngine {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  submitReport({
    reporterId,
    targetType,
    targetId,
    festivalId,
    reason,
    description
  }) {
    const report = new Report({
      id: this.reportRepository.generateId(),
      reporterId,
      targetType,
      targetId,
      festivalId,
      reason,
      description
    });

    this.reportRepository.saveReport(report);
    return report;
  }

  getReportsByStatus(status) {
    return this.reportRepository.getReportsByStatus(status);
  }

  getReportsForFestival(festivalId) {
    return this.reportRepository.getReportsForFestival(festivalId);
  }

  resolveReport(reportId, action) {
    const report = this.reportRepository.getReport(reportId);
    if (!report) throw new Error("Report not found");

    report.status = action === "dismiss" ? "dismissed" : "action_taken";
    report.resolvedAt = new Date().toISOString();

    this.reportRepository.saveReport(report);
    return report;
  }

  getUserReportHistory(userId) {
    return this.reportRepository.getReportsByUser(userId);
  }
}
`,

  // TESTY
  "__tests__/moderation-engine.test.js": `
import { ModerationEngine } from "../engine/moderationEngine.js";

describe("GFAL Moderation & Reporting Engine", () => {
  const mockRepo = {
    generateId: jest.fn(),
    saveReport: jest.fn(),
    getReport: jest.fn(),
    getReportsByStatus: jest.fn(),
    getReportsForFestival: jest.fn(),
    getReportsByUser: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits a report", () => {
    mockRepo.generateId.mockReturnValue(100);

    const engine = new ModerationEngine({ reportRepository: mockRepo });

    const report = engine.submitReport({
      reporterId: 1,
      targetType: "review",
      targetId: 5,
      reason: "abuse"
    });

    expect(report.id).toBe(100);
    expect(report.targetType).toBe("review");
    expect(mockRepo.saveReport).toHaveBeenCalled();
  });

  it("resolves a report", () => {
    mockRepo.getReport.mockReturnValue({
      id: 100,
      status: "pending"
    });

    const engine = new ModerationEngine({ reportRepository: mockRepo });

    const resolved = engine.resolveReport(100, "take_action");

    expect(resolved.status).toBe("action_taken");
    expect(resolved.resolvedAt).not.toBeNull();
  });

  it("dismisses a report", () => {
    mockRepo.getReport.mockReturnValue({
      id: 100,
      status: "pending"
    });

    const engine = new ModerationEngine({ reportRepository: mockRepo });

    const resolved = engine.resolveReport(100, "dismiss");

    expect(resolved.status).toBe("dismissed");
  });
});
`
};

function generateGFAL18() {
  const baseDir = path.join(ROOT, "apps", "GFAL-18__Festival_Moderation_And_Reporting_System");

  Object.entries(FILES).forEach(([relativePath, content]) => {
    const filePath = path.join(baseDir, relativePath);
    const dir = path.dirname(filePath);

    ensureDir(dir);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim(), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 GFAL‑18 Festival Moderation & Reporting System is ready.");
}

generateGFAL18();
