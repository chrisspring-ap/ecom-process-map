import {
  OWNER_ROLES,
  roadmap,
  type AutomationLevel,
  type Milestone,
  type Phase,
} from "@/data/roadmap";

export { OWNER_ROLES };

type OwnerStyle = { dot: string; pill: string; ring: string; text: string };

const OWNER_STYLES: Record<string, OwnerStyle> = {
  "Account Manager": {
    dot: "bg-owner-am",
    pill: "bg-owner-am/10 border-owner-am/35",
    ring: "border-owner-am",
    text: "text-owner-am",
  },
  "New Build Team": {
    dot: "bg-owner-build",
    pill: "bg-owner-build/10 border-owner-build/35",
    ring: "border-owner-build",
    text: "text-owner-build",
  },
  "Creative Team": {
    dot: "bg-owner-creative",
    pill: "bg-owner-creative/10 border-owner-creative/35",
    ring: "border-owner-creative",
    text: "text-owner-creative",
  },
  "Additional Services Team": {
    dot: "bg-owner-services",
    pill: "bg-owner-services/10 border-owner-services/35",
    ring: "border-owner-services",
    text: "text-owner-services",
  },
  Sales: {
    dot: "bg-owner-sales",
    pill: "bg-owner-sales/10 border-owner-sales/35",
    ring: "border-owner-sales",
    text: "text-owner-sales",
  },
  "Senior Team": {
    dot: "bg-owner-senior",
    pill: "bg-owner-senior/10 border-owner-senior/35",
    ring: "border-owner-senior",
    text: "text-owner-senior",
  },
  "Feed Team": {
    dot: "bg-owner-feed",
    pill: "bg-owner-feed/10 border-owner-feed/35",
    ring: "border-owner-feed",
    text: "text-owner-feed",
  },
};

export const ownerClasses = (owner: string): OwnerStyle =>
  OWNER_STYLES[owner] ?? OWNER_STYLES["Senior Team"]!;

const OWNER_INITIALS: Record<string, string> = {
  "Account Manager": "AM",
  "New Build Team": "NBT",
  "Creative Team": "CT",
  "Additional Services Team": "AST",
  Sales: "S",
  "Senior Team": "ST",
  "Feed Team": "FT",
};

export const ownerInitials = (owner: string): string =>
  OWNER_INITIALS[owner] ??
  owner
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export type DotTone = "manual" | "semi" | "automated";

export function dotTone(level: AutomationLevel): DotTone {
  if (level === "Automated") return "automated";
  if (level === "Semi Automated") return "semi";
  return "manual";
}

/** Most common automation level among subtasks, falling back to the milestone's own. */
export function summaryAutomationLevel(milestone: Milestone): AutomationLevel {
  if (milestone.subtasks.length === 0) return milestone.automationLevel;
  const counts = new Map<AutomationLevel, number>();
  for (const s of milestone.subtasks) {
    counts.set(s.automationLevel, (counts.get(s.automationLevel) ?? 0) + 1);
  }
  let best: AutomationLevel = milestone.automationLevel;
  let bestCount = -1;
  for (const [level, count] of counts) {
    if (count > bestCount) {
      best = level;
      bestCount = count;
    }
  }
  return best;
}

export function milestoneKey(phaseId: string, index: number) {
  return `${phaseId}#${index}`;
}

export function findPhase(phaseId: string): Phase | undefined {
  return roadmap.find((p) => p.id === phaseId);
}
