import { APP_VERSION } from "@/lib/version";

export default function VersionFooter() {
  return (
    <p className="mt-10 text-center text-xs text-muted-foreground">
      Version {APP_VERSION}
    </p>
  );
}
