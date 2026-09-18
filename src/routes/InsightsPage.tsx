import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { roadmap } from "@/data/roadmap";
import { computeOwnerAutomationMix, computeTimeSavedLeaderboard } from "@/lib/insights";
import { formatMinutes } from "@/lib/metrics";
import { ownerClasses, ownerInitials } from "@/lib/roadmap-meta";
import { cn } from "@/lib/utils";
import VersionFooter from "@/components/VersionFooter";

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  padding: "8px 10px",
};

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function OwnerMixTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const total = payload.reduce((sum, p) => sum + p.value, 0);
  return (
    <div style={tooltipStyle}>
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-muted-foreground">
          <span style={{ color: p.color }}>●</span> {p.dataKey}: {p.value}
        </p>
      ))}
      <p className="mt-1 border-t border-border pt-1 text-foreground">
        {total} tasks total
      </p>
    </div>
  );
}

function LeaderboardTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { title: string; owner: string; minutesSaved: number; percentSaved: number } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0]!.payload;
  return (
    <div style={tooltipStyle}>
      <p className="mb-1 max-w-56 font-semibold text-foreground">{entry.title}</p>
      <p className="text-muted-foreground">{entry.owner}</p>
      <p className="mt-1 text-foreground">
        {formatMinutes(entry.minutesSaved)} saved / month ({entry.percentSaved.toFixed(0)}%)
      </p>
    </div>
  );
}

export default function InsightsPage() {
  const ownerMix = computeOwnerAutomationMix(roadmap);
  const leaderboard = computeTimeSavedLeaderboard(roadmap, 8);
  const leaderboardData = leaderboard.map((entry) => ({
    ...entry,
    shortTitle: truncate(entry.title, 30),
  }));

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

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Insights
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A closer look at where automation stands by team, and which milestones are
          saving the most time each month.
        </p>

        <section className="mt-8 rounded-xl border border-border bg-card px-5 py-5">
          <h2 className="text-sm font-bold text-foreground">Automation mix by owner</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Tasks per team, split by automation level.
          </p>
          <div className="mt-4" style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={ownerMix} margin={{ top: 8, right: 8, left: 0, bottom: 56 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="owner"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                />
                <Tooltip content={<OwnerMixTooltip />} cursor={{ fill: "var(--secondary)" }} />
                <Bar dataKey="manual" name="Manual" stackId="a" fill="var(--status-idle)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="semi" name="Semi Automated" stackId="a" fill="var(--status-warn)" />
                <Bar
                  dataKey="automated"
                  name="Automated"
                  stackId="a"
                  fill="var(--status-done)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-status-done" /> Automated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-status-warn" /> Semi automated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-status-idle" /> Manual
            </span>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-card px-5 py-5">
          <h2 className="text-sm font-bold text-foreground">Time saved leaderboard</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            The milestones saving the most time per month since automating.
          </p>
          {leaderboardData.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No milestones with recorded time savings yet.
            </p>
          ) : (
            <div className="mt-4" style={{ width: "100%", height: leaderboardData.length * 46 + 20 }}>
              <ResponsiveContainer>
                <BarChart
                  data={leaderboardData}
                  layout="vertical"
                  margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(value: number) => formatMinutes(value)}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="shortTitle"
                    width={200}
                    tick={{ fontSize: 11, fill: "var(--foreground)" }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <Tooltip content={<LeaderboardTooltip />} cursor={{ fill: "var(--secondary)" }} />
                  <Bar dataKey="minutesSaved" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 space-y-1.5">
            {leaderboard.map((entry) => {
              const style = ownerClasses(entry.owner);
              return (
                <Link
                  key={`${entry.phaseId}-${entry.milestoneIndex}`}
                  to={`/milestone/${entry.phaseId}/${entry.milestoneIndex}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-secondary"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full text-[8px] font-bold text-background",
                        style.dot,
                      )}
                    >
                      {ownerInitials(entry.owner)}
                    </span>
                    {entry.title}
                  </span>
                  <span className="whitespace-nowrap font-medium text-muted-foreground">
                    {formatMinutes(entry.minutesSaved)}/mo
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <VersionFooter />
      </div>
    </main>
  );
}
