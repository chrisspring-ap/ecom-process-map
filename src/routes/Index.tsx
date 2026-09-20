import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChevronDown,
  ClipboardList,
  Hammer,
  RefreshCw,
  Settings2,
  ShoppingCart,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";
import { roadmap, type Milestone } from "@/data/roadmap";
import { OWNER_ROLES, dotTone, ownerClasses, ownerInitials, ownerRoles } from "@/lib/roadmap-meta";
import { computeTotals, formatMinutes, getMilestoneTimeSummary } from "@/lib/metrics";
import { history } from "@/data/history";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MilestoneSearch } from "@/components/MilestoneSearch";
import addPeopleLogo from "@/assets/addpeople-logo.svg";
import VersionFooter from "@/components/VersionFooter";

const toneClasses: Record<string, string> = {
  automated: "bg-status-done border-status-done",
  semi: "bg-status-warn border-status-warn",
  manual: "bg-status-idle border-status-idle",
};

const toneTextClasses: Record<string, string> = {
  automated: "text-status-done",
  semi: "text-status-warn",
  manual: "text-muted-foreground",
};

const toneLabels: Record<string, string> = {
  automated: "Automated",
  semi: "Semi automated",
  manual: "Manual",
};

// One small icon per phase, purely decorative, to make the phase list a
// little more scannable than plain text headers. Falls back to no icon for
// any phase id not covered here (e.g. if a new phase is added to the sheet).
const PHASE_ICONS: Record<string, LucideIcon> = {
  sales: ShoppingCart,
  "pre-trial": ClipboardList,
  "trial-build": Hammer,
  "trial-period": Timer,
  "conversion-to-recurring-revenue": RefreshCw,
  "rec-rev-set-up": Settings2,
  "ongoing-account-management": Users,
};

// Renders a number that animates from its previous value up (or down) to
// `value` whenever it changes, then formats it for display. Used on the
// homepage stat cards for a bit of "alive" dashboard feel.
function CountUp({
  value,
  formatter,
  durationMs,
}: {
  value: number;
  formatter: (n: number) => string;
  durationMs?: number;
}) {
  const animated = useCountUp(value, durationMs);
  return <>{formatter(animated)}</>;
}

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

// Small donut giving an instant visual read of the automated/semi/manual
// split, alongside the numeric breakdown already shown as text.
function AutomationDonut({
  automated,
  semi,
  manual,
}: {
  automated: number;
  semi: number;
  manual: number;
}) {
  const total = automated + semi + manual;
  const percent = total > 0 ? ((automated + semi * 0.5) / total) * 100 : 0;
  const animatedPercent = useCountUp(percent);
  const data = [
    { name: "Automated", value: automated, color: "var(--status-done)" },
    { name: "Semi Automated", value: semi, color: "var(--status-warn)" },
    { name: "Manual", value: manual, color: "var(--status-idle)" },
  ].filter((d) => d.value > 0);

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="72%"
            outerRadius="100%"
            paddingAngle={data.length > 1 ? 3 : 0}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute text-[10px] font-bold text-foreground">
        {Math.round(animatedPercent)}%
      </span>
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
  value: ReactNode;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card px-4 py-3 transition-shadow duration-200 hover:shadow-md",
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
  const [collapsedPhases, setCollapsedPhases] = useLocalStorageState<string[]>(
    "epm-collapsed-phases",
    [],
  );

  const totals = computeTotals(roadmap);

  const phases = roadmap
    .map((phase) => ({
      phase,
      milestones: phase.milestones
        .map((m, i) => ({ m, i }))
        .filter(({ m }) => owner === "All" || ownerRoles(m.owner).includes(owner)),
    }))
    .filter(({ milestones }) => milestones.length > 0);

  const toggleCollapsed = (phaseId: string) => {
    setCollapsedPhases((current) =>
      current.includes(phaseId)
        ? current.filter((id) => id !== phaseId)
        : [...current, phaseId],
    );
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <img src={addPeopleLogo} alt="Add People" className="h-7 w-auto" />
          <ThemeToggle />
        </div>
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
            value={
              <CountUp value={totals.totalPreviousMinutes} formatter={formatMinutes} />
            }
          />
          <SummaryStat
            label="Time spent / month (now)"
            value={
              <CountUp value={totals.totalCurrentMinutes} formatter={formatMinutes} />
            }
          />
          <div>
            <SummaryStat
              label="Time saved / month"
              value={<CountUp value={totals.minutesSaved} formatter={formatMinutes} />}
              sub={
                totals.minutesSaved > 0
                  ? `${totals.percentSaved.toFixed(0)}% reduction`
                  : undefined
              }
              highlight
            />
            <TimeSavedSparkline />
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-shadow duration-200 hover:shadow-md">
            <AutomationDonut
              automated={totals.automatedCount}
              semi={totals.semiAutomatedCount}
              manual={totals.manualCount}
            />
            <div>
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Tasks automated
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                <CountUp
                  value={totals.automatedCount}
                  formatter={(n) => `${Math.round(n)} of ${totals.totalTasks}`}
                />
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {totals.semiAutomatedCount} semi-automated · {totals.manualCount} manual
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Based on {totals.milestonesTracked} of {totals.totalMilestones} milestones
          with time data recorded so far — totals will grow as more time-taken data
          is added to the sheet.
        </p>
      </section>

      <div className="mb-8 flex flex-wrap items-center gap-3">
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
        <div className="ml-auto w-full sm:w-auto">
          <MilestoneSearch />
        </div>
      </div>

      <div className="space-y-3">
        {phases.map(({ phase, milestones }) => {
          const PhaseIcon = PHASE_ICONS[phase.id];
          const collapsed = collapsedPhases.includes(phase.id);
          return (
            <section
              key={phase.id}
              className="rounded-xl border border-border bg-card px-5 py-5 transition-shadow duration-200 hover:shadow-md"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    {milestones.length}
                  </span>
                  {PhaseIcon && (
                    <PhaseIcon className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <h2 className="text-sm font-bold text-foreground">{phase.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <PhaseAutomationBar percent={phaseAutomationPercent(milestones)} />
                  <button
                    type="button"
                    onClick={() => toggleCollapsed(phase.id)}
                    aria-label={collapsed ? `Expand ${phase.name}` : `Collapse ${phase.name}`}
                    aria-expanded={!collapsed}
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        collapsed && "-rotate-90",
                      )}
                    />
                  </button>
                </div>
              </div>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="-mx-1 mt-4 overflow-x-auto px-1 pb-2">
                    <div className="relative flex min-w-max items-start">
                      <div className="absolute top-9 right-6 left-6 h-px bg-border" />
                      {milestones.map(({ m, i }) => {
                        const tone = dotTone(m.automationLevel);
                        const style = ownerClasses(m.owner);
                        const timeSummary = getMilestoneTimeSummary(m);
                        const minutesSaved =
                          timeSummary.previousMinutesPerMonth -
                          timeSummary.currentMinutesPerMonth;
                        const timeLabel = !timeSummary.hasData
                          ? "No time data yet"
                          : minutesSaved > 0
                            ? `${formatMinutes(minutesSaved)} saved/mo`
                            : "No change yet";
                        return (
                          <Link
                            key={i}
                            to={`/milestone/${phase.id}/${i}`}
                            className="group relative flex w-36 flex-col items-center gap-0 px-1"
                            title={`${m.title} · ${m.owner}`}
                          >
                            <span
                              className={cn(
                                "flex size-7 items-center justify-center rounded-full border text-[9px] font-bold text-on-color",
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

                            <div className="mt-0 max-h-0 overflow-hidden text-center opacity-0 transition-all duration-200 group-hover:mt-1.5 group-hover:max-h-10 group-hover:opacity-100">
                              <p
                                className={cn(
                                  "text-[10px] font-semibold",
                                  toneTextClasses[tone],
                                )}
                              >
                                {toneLabels[tone]}
                              </p>
                              <p className="text-[10px] text-muted-foreground">{timeLabel}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <VersionFooter />
    </main>
  );
}
