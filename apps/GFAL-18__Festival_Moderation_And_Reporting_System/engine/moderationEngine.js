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