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