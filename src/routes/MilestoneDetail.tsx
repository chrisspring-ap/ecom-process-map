import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Task } from "@/data/roadmap";
import {
  findPhase,
  ownerClasses,
  ownerInitials,
  summaryAutomationLevel,
} from "@/lib/roadmap-meta";

import { cn } from "@/lib/utils";
import { formatMinutes, getMilestoneTimeSummary } from "@/lib/metrics";
import VersionFooter from "@/components/VersionFooter";

const automationClasses: Record<string, string> = {
  "Semi Automated": "bg-status-warn/15 text-foreground border-status-warn/40",
  Automated: "bg-status-done/15 text-foreground border-status-done/40",
  Manual: "bg-status-idle/20 text-foreground border-status-idle/50",
};

const dash = "—";

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card px-4 py-3",
        highlight ? "border-2 border-foreground/40" : "border border-border",
      )}
    >
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-lg text-foreground",
          highlight ? "font-bold" : "font-semibold",
        )}
      >
        {value}
      </p>
    </div>
  );
}

const money = (v?: number) => (v === undefined ? dash : `£${v}`);
const text = (v?: string | number) => (v === undefined ? dash : String(v));

export default function MilestoneDetail() {
  const { phaseId, milestoneIndex } = useParams<{
    phaseId: string;
    milestoneIndex: string;
  }>();
  const index = Number(milestoneIndex);
  const phase = phaseId ? findPhase(phaseId) : undefined;
  const milestone = phase?.milestones[index];

  if (!phase || !milestone) {
    return (
      <main className="min-h-screen bg-background px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to roadmap
          </Link>
          <p className="mt-8 text-sm text-muted-foreground">Milestone not found.</p>
        </div>
      </main>
    );
  }

  const style = ownerClasses(milestone.owner);
  const automation = summaryAutomationLevel(milestone);
  const rows: Task[] =
    milestone.subtasks.length > 0 ? milestone.subtasks : [{ ...milestone }];
  const timeSummary = getMilestoneTimeSummary(milestone);

  return (
    <main className="min-h-screen bg-background px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to roadmap
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {phase.name}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              {milestone.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-[9px] font-bold text-background",
                  style.dot,
                )}
              >
                {ownerInitials(milestone.owner)}
              </span>
              <span className="text-sm font-medium text-foreground">
                {milestone.owner}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Automation level
            </p>
            <span
              className={cn(
                "mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                automationClasses[automation],
              )}
            >
              {automation}
            </span>
          </div>
        </div>

        <h2 className="mt-10 text-sm font-bold tracking-wide text-foreground">
          Time &amp; Cost
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {timeSummary.mode === "subtasks" ? (
            <>
              <Stat
                label="Previous Time / Month"
                value={formatMinutes(timeSummary.previousMinutesPerMonth)}
              />
              <Stat
                label="Current Time / Month"
                value={formatMinutes(timeSummary.currentMinutesPerMonth)}
              />
              <Stat
                label="Average Monthly Instances"
                value={text(timeSummary.averageMonthlyInstances)}
              />
            </>
          ) : (
            <>
              <Stat label="Previous Time Taken" value={text(milestone.previousTimeTaken)} />
              <Stat label="Current Time Taken" value={text(milestone.currentTimeTaken)} />
              <Stat label="Monthly Instances" value={text(milestone.monthlyInstances)} />
            </>
          )}
          <Stat
            label="Previous Monthly Spend"
            value={money(milestone.previousMonthlySpend)}
          />
          <Stat
            label="Current Monthly Spend"
            value={money(milestone.currentMonthlySpend)}
          />
          <Stat
            label="Estimated Saving"
            value={money(milestone.estimatedMonthlySaving)}
            highlight
          />
        </div>

        <h2 className="mt-10 text-sm font-bold tracking-wide text-foreground">Tasks</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="w-[20%] px-4 py-3">Subitem</th>
                <th className="w-[11%] px-4 py-3">Owner</th>
                <th className="w-[10%] px-4 py-3">Automation Level</th>
                <th className="w-[9%] px-4 py-3">Monthly Instances</th>
                <th className="w-[11%] px-4 py-3">Current Time To Complete</th>
                <th className="w-[9%] px-4 py-3">Link</th>
                <th className="w-[19%] px-4 py-3">Notes</th>
                <th className="w-[11%] px-4 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, si) => (
                <tr key={si} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{row.title}</td>
                  <td className="px-4 py-3 text-foreground">{row.owner}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-foreground">
                    {row.automationLevel}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-foreground">
                    {text(row.monthlyInstances)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-foreground">
                    {text(row.currentTimeTaken)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.link ? (
                      <a
                        href={row.link}
                        className="inline-flex items-center gap-1.5 text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                      >
                        <ExternalLink className="size-3.5" />
                        Open
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{dash}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.notes ?? ""}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.lastUpdated ?? dash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <VersionFooter />
      </div>
    </main>
  );
}
