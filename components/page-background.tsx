import { cn } from "@/components/ui";

type PageBackgroundProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function PageBackground({ variant = "light", className }: PageBackgroundProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base wash */}
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(244,228,189,0.07),transparent_55%)]"
            : "bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(244,228,189,0.45),transparent_55%)]",
        )}
      />

      {/* Ambient orbs */}
      <div
        className={cn(
          "ambient-orb absolute -left-[12%] top-[8%] size-[min(520px,85vw)] rounded-full blur-3xl",
          isDark ? "bg-brass-500/[0.07]" : "bg-brass-100/70",
        )}
      />
      <div
        className={cn(
          "ambient-orb absolute -right-[8%] top-[32%] size-[min(440px,75vw)] rounded-full blur-3xl",
          isDark ? "bg-white/[0.03]" : "bg-ink-200/55",
        )}
        style={{ animationDelay: "-4s" }}
      />
      <div
        className={cn(
          "ambient-orb absolute bottom-[6%] left-[28%] size-[min(380px,70vw)] rounded-full blur-3xl",
          isDark ? "bg-emerald-400/[0.04]" : "bg-[#edf3ec]/80",
        )}
        style={{ animationDelay: "-8s" }}
      />

      {/* Grid + noise */}
      <div className="surface-grid absolute inset-0 opacity-[0.55] dark:opacity-[0.35]" />
      <div
        className={cn(
          "noise-layer absolute inset-0",
          isDark ? "text-white opacity-[0.022]" : "text-ink-950 opacity-[0.018]",
        )}
      />

      {/* Edge vignette */}
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,16,15,0.55)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(251,251,250,0.85)_100%)]",
        )}
      />
    </div>
  );
}
