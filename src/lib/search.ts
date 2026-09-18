import type { Phase } from "@/data/roadmap";

export type FlatMilestone = {
  phaseId: string;
  phaseName: string;
  milestoneIndex: number;
  title: string;
  owner: string;
  order: number;
};

export function flattenMilestones(roadmap: Phase[]): FlatMilestone[] {
  const flat: FlatMilestone[] = [];
  let order = 0;
  for (const phase of roadmap) {
    phase.milestones.forEach((m, milestoneIndex) => {
      flat.push({
        phaseId: phase.id,
        phaseName: phase.name,
        milestoneIndex,
        title: m.title,
        owner: m.owner,
        order: order++,
      });
    });
  }
  return flat;
}

export function searchMilestones(
  query: string,
  list: FlatMilestone[],
  limit = 8,
): FlatMilestone[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return list
    .filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q) ||
        m.phaseName.toLowerCase().includes(q),
    )
    .slice(0, limit);
}
