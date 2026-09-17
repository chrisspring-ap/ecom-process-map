// Manually maintained snapshot of process totals at each released version.
// Each time the roadmap data changes and the version is bumped, add a new
// entry here with the recomputed totals (see src/lib/metrics.ts
// computeTotals) so management can see how things have improved over time.
//
// Version numbering was reset to 1.0 on 2026-09-17: this is the first
// release of the process map against the fully synced sheet (all phases,
// milestones and time-taken data as currently tracked), so it's treated as
// the baseline going forward rather than a continuation of the earlier
// 1.0–1.4 build-out sequence.
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
    date: "2026-09-17",
    label: "First release: full sheet sync across all phases and milestones",
    totalPreviousMinutes: 7480,
    totalCurrentMinutes: 73473,
    milestonesTracked: 41,
    totalMilestones: 53,
    automatedCount: 10,
    semiAutomatedCount: 10,
    manualCount: 177,
    totalTasks: 197,
  },
];
