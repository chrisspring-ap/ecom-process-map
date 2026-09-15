import type { Phase } from "@/data/roadmap";

// Time-taken values are entered as free text in the sheet (e.g. "90 mins",
// "1.5 hours", "2 days"). This parses them into minutes so totals can be
// summed across the whole process. A "day" is treated as an 8-hour workday.
const UNIT_TO_MINUTES: Record<string, number> = {
  min: 1,
  mins: 1,
  minute: 1,
  minutes: 1,
  hr: 60,
  hrs: 60,
  hour: 60,
  hours: 60,
  day: 480,
  days: 480,
};

export function parseTimeToMinutes(value?: string): number | undefined {
  if (!value) return undefined;
  const match = value.trim().toLowerCase().match(/^([\d.]+)\s*([a-z]+)/);
  if (!match) return undefined;
  const amount = Number.parseFloat(match[1]);
  const multiplier = UNIT_TO_MINUTES[match[2]];
  if (Number.isNaN(amount) || !multiplier) return undefined;
  return amount * multiplier;
}

export function formatMinutes(minutes: number): string {
  if (!minutes || minutes <= 0) return "0 mins";
  if (minutes < 60) return `${Math.round(minutes)} mins`;
  const hours = minutes / 60;
  return `${hours.toFixed(hours < 10 ? 1 : 0)} hrs`;
}

export type ProcessTotals = {
  totalPreviousMinutes: number;
  totalCurrentMinutes: number;
  minutesSaved: number;
  percentSaved: number;
  milestonesTracked: number;
  totalMilestones: number;
  automatedCount: number;
  semiAutomatedCount: number;
  manualCount: number;
  totalTasks: number;
};

// Time-taken is tracked at the milestone level only (not per subtask).
// Automation level is tracked per leaf task: a milestone's own subtasks if
// it has any, otherwise the milestone itself.
export function computeTotals(roadmap: Phase[]): ProcessTotals {
  let totalPreviousMinutes = 0;
  let totalCurrentMinutes = 0;
  let milestonesTracked = 0;
  let totalMilestones = 0;
  let automatedCount = 0;
  let semiAutomatedCount = 0;
  let manualCount = 0;
  let totalTasks = 0;

  for (const phase of roadmap) {
    for (const milestone of phase.milestones) {
      totalMilestones += 1;

      const prevMinutes = parseTimeToMinutes(milestone.previousTimeTaken);
      const currMinutes = parseTimeToMinutes(milestone.currentTimeTaken);
      if (prevMinutes !== undefined || currMinutes !== undefined) {
        milestonesTracked += 1;
        const instances = milestone.monthlyInstances ?? 0;
        if (prevMinutes !== undefined) totalPreviousMinutes += prevMinutes * instances;
        if (currMinutes !== undefined) totalCurrentMinutes += currMinutes * instances;
      }

      const rows = milestone.subtasks.length > 0 ? milestone.subtasks : [milestone];
      for (const row of rows) {
        totalTasks += 1;
        if (row.automationLevel === "Automated") automatedCount += 1;
        else if (row.automationLevel === "Semi Automated") semiAutomatedCount += 1;
        else manualCount += 1;
      }
    }
  }

  const minutesSaved = totalPreviousMinutes - totalCurrentMinutes;
  const percentSaved =
    totalPreviousMinutes > 0 ? (minutesSaved / totalPreviousMinutes) * 100 : 0;

  return {
    totalPreviousMinutes,
    totalCurrentMinutes,
    minutesSaved,
    percentSaved,
    milestonesTracked,
    totalMilestones,
    automatedCount,
    semiAutomatedCount,
    manualCount,
    totalTasks,
  };
}
