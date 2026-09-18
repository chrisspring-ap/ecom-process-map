import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

function prefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

// Class-based dark mode toggle, persisted across visits. Defaults to the
// OS-level preference the first time someone opens the app, then remembers
// whatever they choose after that.
export function ThemeToggle() {
  const [dark, setDark] = useLocalStorageState<boolean>("epm-theme-dark", prefersDark());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((current) => !current)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
