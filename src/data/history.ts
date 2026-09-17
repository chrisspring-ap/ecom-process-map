// Manually maintained snapshot of process totals at each released version.
// Each time the roadmap data changes and the version is bumped, add a new
// entry here with the recomputed totals (see src/lib/metrics.ts
// computeTotals) so management can see how things have improved over time.
export type HistorySnapshot = {
  version: string;
  date: string;
  label: string;
  totalPreviousMinutes: number;
  totalCurrentMinutes: number;
  milestonesTracked: number;
  totalMilestones: number;
  automatedCount: number;
  semiAutomatedCount: number;
  manualCount: number;
  totalTasks: number;
};

export const history: HistorySnapshot[] = [
  {
    version: "1.0",
    date: "2026-09-15",
    label: "Initial self-hosted launch",
    totalPreviousMinutes: 0,
    totalCurrentMinutes: 0,
    milestonesTracked: 0,
    totalMilestones: 68,
    automatedCount: 10,
    semiAutomatedCount: 10,
    manualCount: 130,
    totalTasks: 150,
  },
  {
    version: "1.2",
    date: "2026-09-15",
    label: "Added GA4 account creation time data",
    totalPreviousMinutes: 6570,
    totalCurrentMinutes: 1095,
    milestonesTracked: 1,
    totalMilestones: 68,
    automatedCount: 10,
    semiAutomatedCount: 10,
    manualCount: 130,
    totalTasks: 150,
  },
  {
    version: "1.4",
    date: "2026-09-17",
    label: "Full sheet sync: new Ongoing Account Management phase, milestone restructuring, and subtask-level time totals",
    totalPreviousMinutes: 8575,
    totalCurrentMinutes: 52449,
    milestonesTracked: 34,
    totalMilestones: 53,
    automatedCount: 10,
    semiAutomatedCount: 10,
    manualCount: 176,
    totalTasks: 196,
  },
];
