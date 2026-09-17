import type { Milestone, Phase } from "@/data/roadmap";

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

export type MilestoneTimeSummary = {
  hasData: boolean;
  // "direct": the milestone itself carries a time-taken value.
  // "subtasks": no milestone-level time, but one or more subtasks do, so
  //   their per-subtask times (each weighted by that subtask's own monthly
  //   instances, since subtasks under one milestone can happen at different
  //   frequencies) are summed to give the milestone's monthly total.
  // "none": no time data at either level.
  mode: "direct" | "subtasks" | "none";
  previousMinutesPerMonth: number;
  currentMinutesPerMonth: number;
};

// Time is tracked either at the milestone level, or — when a milestone's
// subitems each have their own time-taken value instead — at the subtask
// level, in which case the subtask times are totaled up to the milestone.
// A milestone's own directly-set time always takes priority over summing
// its subtasks.
export function getMilestoneTimeSummary(milestone: Milestone): MilestoneTimeSummary {
  const ownPrev = parseTimeToMinutes(milestone.previousTimeTaken);
  const ownCurr = parseTimeToMinutes(milestone.currentTimeTaken);

  if (ownPrev !== undefined || ownCurr !== undefined) {
    const instances = milestone.monthlyInstances ?? 0;
    return {
      hasData: true,
      mode: "direct",
      previousMinutesPerMonth: (ownPrev ?? 0) * instances,
      currentMinutesPerMonth: (ownCurr ?? 0) * instances,
    };
  }

  let previousMinutesPerMonth = 0;
  let currentMinutesPerMonth = 0;
  let hasData = false;

  for (const subtask of milestone.subtasks) {
    const p = parseTimeToMinutes(subtask.previousTimeTaken);
    const c = parseTimeToMinutes(subtask.currentTimeTaken);
    if (p === undefined && c === undefined) continue;
    hasData = true;
    const instances = subtask.monthlyInstances ?? milestone.monthlyInstances ?? 0;
    previousMinutesPerMonth += (p ?? 0) * instances;
    currentMinutesPerMonth += (c ?? 0) * instances;
  }

  return {
    hasData,
    mode: hasData ? "subtasks" : "none",
    previousMinutesPerMonth,
    currentMinutesPerMonth,
  };
}

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

      const summary = getMilestoneTimeSummary(milestone);
      if (summary.hasData) {
        milestonesTracked += 1;
        totalPreviousMinutes += summary.previousMinutesPerMonth;
        totalCurrentMinutes += summary.currentMinutesPerMonth;
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
