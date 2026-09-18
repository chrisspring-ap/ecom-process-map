import { useState } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { roadmap, type Milestone } from "@/data/roadmap";
import { OWNER_ROLES, dotTone, ownerClasses, ownerInitials } from "@/lib/roadmap-meta";
import { computeTotals, formatMinutes } from "@/lib/metrics";
import { history } from "@/data/history";
import { cn } from "@/lib/utils";
import addPeopleLogo from "@/assets/addpeople-logo.svg";
import VersionFooter from "@/components/VersionFooter";

const toneClasses: Record<string, string> = {
  automated: "bg-status-done border-status-done",
  semi: "bg-status-warn border-status-warn",
  manual: "bg-status-idle border-status-idle",
};

// Automation is weighted at half-credit for "Semi Automated" tasks, counted
// at the leaf-task level (a milestone's own subtasks if it has any,
// otherwise the milestone itself) — respects the current owner filter since
// it's computed from the already-filtered milestone list for each phase.
function phaseAutomationPercent(milestones: { m: Milestone }[]): number {
  let automated = 0;
  let semi = 0;
  let total = 0;
  for (const { m } of milestones) {
    const rows = m.subtasks.length > 0 ? m.subtasks : [m];
    for (const row of rows) {
      total += 1;
      if (row.automationLevel === "Automated") automated += 1;
      else if (row.automationLevel === "Semi Automated") semi += 1;
    }
  }
  return total > 0 ? ((automated + semi * 0.5) / total) * 100 : 0;
}

function PhaseAutomationBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary sm:w-20">
        <div
          className="h-full rounded-full bg-status-done"
          style={{ width: `${Math.min(100, Math.round(percent))}%` }}
        />
      </div>
      <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground">
        {Math.round(percent)}% automated
      </span>
    </div>
  );
}

// Trend of monthly minutes saved across released versions. Only renders once
// there are at least two snapshots in history.ts, since a single point has no
// trend to show yet — it'll start appearing automatically as more versions
// are recorded.
function TimeSavedSparkline() {
  if (history.length < 2) return null;
  const data = [...history]
    .sort((a, b) => (a.version > b.version ? 1 : -1))
    .map((snapshot) => ({
      version: snapshot.version,
      minutesSaved: snapshot.totalPreviousMinutes - snapshot.totalCurrentMinutes,
    }));

  return (
    <div className="mt-1.5 h-6 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="minutesSaved"
            stroke="var(--status-done)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
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
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function RoadmapOverview() {
  const [owner, setOwner] = useState<string>("All");

  const totals = computeTotals(roadmap);

  const phases = roadmap
    .map((phase) => ({
      phase,
      milestones: phase.milestones
        .map((m, i) => ({ m, i }))
        .filter(({ m }) => owner === "All" || m.owner === owner),
    }))
    .filter(({ milestones }) => milestones.length > 0);

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <header className="mb-8">
        <img src={addPeopleLogo} alt="Add People" className="h-7 w-auto" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Ecom Process Map
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every phase from trial signature through to recurring revenue. Select a
          milestone to see its tasks, automation level and time saved.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-border bg-card px-5 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-foreground">Process overview</h2>
          <div className="flex items-center gap-4">
            <Link
              to="/insights"
              className="text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
            >
              View insights →
            </Link>
            <Link
              to="/history"
              className="text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
            >
              View history over time →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryStat
            label="Time spent / month (before)"
            value={formatMinutes(totals.totalPreviousMinutes)}
          />
          <SummaryStat
            label="Time spent / month (now)"
            value={formatMinutes(totals.totalCurrentMinutes)}
          />
          <div>
            <SummaryStat
              label="Time saved / month"
              value={formatMinutes(totals.minutesSaved)}
              sub={
                totals.minutesSaved > 0
                  ? `${totals.percentSaved.toFixed(0)}% reduction`
                  : undefined
              }
              highlight
            />
            <TimeSavedSparkline />
          </div>
          <SummaryStat
            label="Tasks automated"
            value={`${totals.automatedCount} of ${totals.totalTasks}`}
            sub={`${totals.semiAutomatedCount} semi-automated · ${totals.manualCount} manual`}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Based on {totals.milestonesTracked} of {totals.totalMilestones} milestones
          with time data recorded so far — totals will grow as more time-taken data
          is added to the sheet.
        </p>
      </section>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-muted-foreground">
          Filter by owner:
        </span>
        <button
          onClick={() => setOwner("All")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            owner === "All"
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-foreground hover:bg-secondary",
          )}
        >
          All
        </button>
        {OWNER_ROLES.map((role) => {
          const style = ownerClasses(role);
          const active = owner === role;
          return (
            <button
              key={role}
              onClick={() => setOwner(role)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                style.pill,
                active ? "ring-2 ring-foreground/15" : "hover:brightness-98",
              )}
            >
              <span className={cn("size-2 rounded-full", style.dot)} />
              {role}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {phases.map(({ phase, milestones }) => (
          <section
            key={phase.id}
            className="rounded-xl border border-border bg-card px-5 py-5"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                  {milestones.length}
                </span>
                <h2 className="text-sm font-bold text-foreground">{phase.name}</h2>
              </div>
              <PhaseAutomationBar percent={phaseAutomationPercent(milestones)} />
            </div>

            <div className="-mx-1 overflow-x-auto px-1 pb-2">
              <div className="relative flex min-w-max items-start">
                <div className="absolute top-9 right-6 left-6 h-px bg-border" />
                {milestones.map(({ m, i }) => {
                  const tone = dotTone(m.automationLevel);
                  const style = ownerClasses(m.owner);
                  return (
                    <Link
                      key={i}
                      to={`/milestone/${phase.id}/${i}`}
                      className="group relative flex w-36 flex-col items-center gap-0 px-1"
                      title={`${m.title} · ${m.owner}`}
                    >
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full border text-[9px] font-bold text-background",
                          style.dot,
                          style.ring,
                        )}
                      >
                        {ownerInitials(m.owner)}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 size-4 rounded-full border-2 transition-transform group-hover:scale-125",
                          toneClasses[tone],
                        )}
                      />

                      <span className="mt-3 line-clamp-2 text-center text-[11px] leading-tight text-muted-foreground group-hover:text-foreground">
                        {m.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <VersionFooter />
    </main>
  );
}
