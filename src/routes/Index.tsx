import { useState } from "react";
import { Link } from "react-router-dom";
import { roadmap } from "@/data/roadmap";
import { OWNER_ROLES, dotTone, ownerClasses, ownerInitials } from "@/lib/roadmap-meta";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  automated: "bg-status-done border-status-done",
  semi: "bg-status-warn border-status-warn",
  manual: "bg-status-idle border-status-idle",
};

export default function RoadmapOverview() {
  const [owner, setOwner] = useState<string>("All");

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
        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Process roadmap
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Ecom Process Map
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every phase from trial signature through to recurring revenue. Select a
          milestone to see its tasks, automation level and time saved.
        </p>
      </header>

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
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                {milestones.length}
              </span>
              <h2 className="text-sm font-bold text-foreground">{phase.name}</h2>
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
    </main>
  );
}
