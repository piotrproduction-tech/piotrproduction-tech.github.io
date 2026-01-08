/**
 * Marketplace Sync Scheduler 5.0
 * Harmonogram świata Marketplace:
 *  - ticki czasu
 *  - aktualizacje pogody
 *  - aktualizacje sezonów
 *  - aktualizacje ekonomii
 *  - aktualizacje społeczności
 *  - integracja z HyperOrchestrator
 */

export const MarketplaceSyncScheduler = {
  tasks: [],

  registerTask(name, intervalMs, callback) {
    this.tasks.push({ name, intervalMs, callback, lastRun: 0 });
    return { registered: true, name };
  },

  runTick(state) {
    const now = Date.now();

    const updatedTasks = this.tasks.map(task => {
      if (now - task.lastRun >= task.intervalMs) {
        task.callback(state);
        return { ...task, lastRun: now };
      }
      return task;
    });

    this.tasks = updatedTasks;
    return { tick: true, timestamp: now };
  },

  /**
   * Alias wymagany przez HyperOrchestrator Bridge
   */
  runScheduledTasks(context) {
    return this.runTick(context.state);
  }
};
