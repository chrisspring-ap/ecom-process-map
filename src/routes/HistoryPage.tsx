import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { history } from "@/data/history";
import { formatMinutes } from "@/lib/metrics";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import VersionFooter from "@/components/VersionFooter";

const dash = "—";

function Delta({ value, unit }: { value: number; unit: string }) {
  if (value === 0) return <span className="text-muted-foreground">{dash}</span>;
  const positive = value > 0;
  return (
    <span
      className={cn(
        "font-medium",
        positive ? "text-status-done" : "text-status-warn",
      )}
    >
      {positive ? "+" : ""}
      {value}
      {unit}
    </span>
  );
}

export default function HistoryPage() {
  const rows = [...history].sort((a, b) => (a.version > b.version ? -1 : 1));

  return (
    <main className="min-h-screen bg-background px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to roadmap
          </Link>
          <ThemeToggle />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          History &amp; improvement over time
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A running log of process totals at each released version, so you can see
          how automation and time saved has improved as more of the process gets
          tracked and automated.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">What changed</th>
                <th className="px-4 py-3">Time / month (before)</th>
                <th className="px-4 py-3">Time / month (now)</th>
                <th className="px-4 py-3">Time saved / month</th>
                <th className="px-4 py-3">Tasks automated</th>
                <th className="px-4 py-3">vs. previous version</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((snapshot, idx) => {
                const previous = rows[idx + 1];
                const minutesSaved = snapshot.totalPreviousMinutes - snapshot.totalCurrentMinutes;
                const prevMinutesSaved = previous
                  ? previous.totalPreviousMinutes - previous.totalCurrentMinutes
                  : undefined;
                const savedChange =
                  prevMinutesSaved !== undefined ? minutesSaved - prevMinutesSaved : 0;
                const automatedChange = previous
                  ? snapshot.automatedCount - previous.automatedCount
                  : 0;

                return (
                  <tr key={snapshot.version} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      v{snapshot.version}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {snapshot.date}
                    </td>
                    <td className="px-4 py-3 text-foreground">{snapshot.label}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-foreground">
                      {formatMinutes(snapshot.totalPreviousMinutes)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-foreground">
                      {formatMinutes(snapshot.totalCurrentMinutes)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-foreground">
                      {formatMinutes(minutesSaved)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-foreground">
                      {snapshot.automatedCount} of {snapshot.totalTasks}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {previous ? (
                        <span className="flex flex-col gap-0.5">
                          <Delta value={savedChange} unit=" mins saved" />
                          <Delta value={automatedChange} unit=" automated" />
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <VersionFooter />
      </div>
    </main>
  );
}
