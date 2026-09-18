import type { Milestone, Phase, Task } from "@/data/roadmap";
import { getMilestoneTimeSummary } from "@/lib/metrics";

function leafRows(milestone: Milestone): (Milestone | Task)[] {
  return milestone.subtasks.length > 0 ? milestone.subtasks : [milestone];
}

export type OwnerAutomationMix = {
  owner: string;
  automated: number;
  semi: number;
  manual: number;
  total: number;
};

// Automation mix per owner, counted at the leaf-task level (a milestone's own
// subtasks if it has any, otherwise the milestone itself) — same unit of
// counting as the homepage's "Tasks automated" stat, just broken out by owner
// instead of totaled.
export function computeOwnerAutomationMix(roadmap: Phase[]): OwnerAutomationMix[] {
  const byOwner = new Map<string, OwnerAutomationMix>();

  for (const phase of roadmap) {
    for (const milestone of phase.milestones) {
      for (const row of leafRows(milestone)) {
        const owner = row.owner;
        if (!byOwner.has(owner)) {
          byOwner.set(owner, { owner, automated: 0, semi: 0, manual: 0, total: 0 });
        }
        const bucket = byOwner.get(owner)!;
        bucket.total += 1;
        if (row.automationLevel === "Automated") bucket.automated += 1;
        else if (row.automationLevel === "Semi Automated") bucket.semi += 1;
        else bucket.manual += 1;
      }
    }
  }

  return [...byOwner.values()].sort((a, b) => b.total - a.total);
}

export type LeaderboardEntry = {
  phaseId: string;
  phaseName: string;
  milestoneIndex: number;
  title: string;
  owner: string;
  minutesSaved: number;
  percentSaved: number;
};

// Top milestones ranked by monthly minutes saved. Only milestones with
// recorded time data and a positive saving are eligible, so this only ever
// surfaces genuine automation wins rather than untracked or negative rows.
export function computeTimeSavedLeaderboard(roadmap: Phase[], limit = 8): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];

  for (const phase of roadmap) {
    phase.milestones.forEach((milestone, index) => {
      const summary = getMilestoneTimeSummary(milestone);
      if (!summary.hasData) return;
      const minutesSaved = summary.previousMinutesPerMonth - summary.currentMinutesPerMonth;
      if (minutesSaved <= 0) return;
      const percentSaved =
        summary.previousMinutesPerMonth > 0
          ? (minutesSaved / summary.previousMinutesPerMonth) * 100
          : 0;
      entries.push({
        phaseId: phase.id,
        phaseName: phase.name,
        milestoneIndex: index,
        title: milestone.title,
        owner: milestone.owner,
        minutesSaved,
        percentSaved,
      });
    });
  }

  return entries.sort((a, b) => b.minutesSaved - a.minutesSaved).slice(0, limit);
}
