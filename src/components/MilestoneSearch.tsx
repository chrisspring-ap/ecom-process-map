import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { roadmap } from "@/data/roadmap";
import { ownerClasses, ownerInitials } from "@/lib/roadmap-meta";
import { flattenMilestones, searchMilestones, type FlatMilestone } from "@/lib/search";
import { cn } from "@/lib/utils";

// Quick-jump search box: type a milestone title, owner, or phase name and
// pick a result to go straight to its detail page, without scrolling
// through the phase timelines to find it.
export function MilestoneSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const flat = useMemo(() => flattenMilestones(roadmap), []);
  const results = useMemo(() => searchMilestones(query, flat), [query, flat]);

  const goTo = (m: FlatMilestone) => {
    navigate(`/milestone/${m.phaseId}/${m.milestoneIndex}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-64">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && results[0]) goTo(results[0]);
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Jump to a milestone…"
          className="w-full rounded-full border border-border bg-card py-1.5 pr-3 pl-8 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/15 focus:outline-none"
        />
      </div>
      {open && query.trim() && (
        <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-card shadow-md">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              No milestones match “{query}”.
            </p>
          ) : (
            results.map((m) => {
              const style = ownerClasses(m.owner);
              return (
                <button
                  key={`${m.phaseId}-${m.milestoneIndex}`}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goTo(m)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors hover:bg-secondary"
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-on-color",
                      style.dot,
                    )}
                  >
                    {ownerInitials(m.owner)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">
                      {m.title}
                    </span>
                    <span className="block truncate text-muted-foreground">
                      {m.phaseName}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
