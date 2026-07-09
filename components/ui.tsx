import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { X } from "@phosphor-icons/react";

/* ─── Utility ─────────────────────────────────────────────────────────── */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── Button ───────────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-950 dark:hover:bg-ink-200",
    secondary:
      "border border-ink-200/80 bg-white text-ink-900 hover:bg-ink-100 dark:border-white/10 dark:bg-white/[0.06] dark:text-ink-50 dark:hover:bg-white/[0.1]",
    ghost:
      "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/[0.08]",
    danger:
      "border border-red-200 bg-red-50 text-red-800 hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200",
  };

  return (
    <button
      className={cn(
        "group inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium",
        "transition-all duration-200 ease-mass",
        "active:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink-950",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="grid size-4 shrink-0 place-items-center transition-transform duration-200 ease-mass group-hover:-translate-y-px">
          {icon}
        </span>
      ) : null}
      {children ? <span className="truncate">{children}</span> : null}
    </button>
  );
}

/* ─── Card ─────────────────────────────────────────────────────────────── */
export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "rounded-xl border border-ink-200/70 bg-white shadow-panel",
        "transition-all duration-200 ease-mass",
        "dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-panel-dark",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/* ─── Badge ─────────────────────────────────────────────────────────────── */
export type BadgeTone = "neutral" | "green" | "yellow" | "red" | "blue";

export function Badge({
  tone = "neutral",
  pulse,
  className,
  children,
}: {
  tone?: BadgeTone;
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const tones: Record<BadgeTone, string> = {
    neutral:
      "bg-ink-100 text-ink-700 ring-ink-200/80 dark:bg-white/[0.08] dark:text-ink-200 dark:ring-white/[0.08]",
    green:
      "bg-[#edf3ec] text-[#346538] ring-[#d7e5d5] dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/15",
    yellow:
      "bg-[#fbf3db] text-[#956400] ring-[#eadcae] dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/15",
    red: "bg-[#fdebec] text-[#9f2f2d] ring-[#efcfd0] dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/15",
    blue: "bg-[#e1f3fe] text-[#1f6c9f] ring-[#c2e1f5] dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/15",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5",
        "text-[10.5px] font-semibold uppercase tracking-[0.07em] ring-1",
        tones[tone],
        className,
      )}
    >
      {pulse ? (
        <span className="size-1.5 shrink-0 animate-pulseQuiet rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}

/* ─── Avatar ────────────────────────────────────────────────────────────── */
export function Avatar({
  name,
  role,
  tone = "neutral",
}: {
  name: string;
  role?: string;
  tone?: BadgeTone;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tones: Record<BadgeTone, string> = {
    neutral:
      "bg-ink-100 text-ink-700 dark:bg-white/[0.08] dark:text-ink-100",
    green:
      "bg-[#edf3ec] text-[#346538] dark:bg-emerald-400/10 dark:text-emerald-300",
    yellow:
      "bg-[#fbf3db] text-[#956400] dark:bg-amber-400/10 dark:text-amber-300",
    red: "bg-[#fdebec] text-[#9f2f2d] dark:bg-red-400/10 dark:text-red-300",
    blue: "bg-[#e1f3fe] text-[#1f6c9f] dark:bg-sky-400/10 dark:text-sky-300",
  };

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-lg",
          "text-xs font-bold ring-1 ring-black/[0.06] dark:ring-white/[0.08]",
          tones[tone],
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight text-ink-900 dark:text-ink-50">
          {name}
        </p>
        {role ? (
          <p className="mt-0.5 truncate text-xs leading-tight text-ink-700/60 dark:text-ink-200/50">
            {role}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────────────────── */
export function Modal({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-ink-950/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg animate-fade-up rounded-2xl border border-white/10 bg-white shadow-[0_28px_100px_-30px_rgba(0,0,0,0.5)] dark:bg-ink-900">
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-200/80 px-5 py-4 dark:border-white/10">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-ink-900 dark:text-ink-50">
              {title}
            </h2>
            {description ? (
              <p className="mt-0.5 text-xs leading-5 text-ink-700/60 dark:text-ink-200/50">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="Đóng"
            variant="ghost"
            className="size-8 shrink-0 px-0"
            onClick={onClose}
            icon={<X size={15} weight="bold" />}
          />
        </div>
        {/* body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-ink-100 dark:bg-white/[0.07]",
        className,
      )}
    >
      <div className="absolute inset-y-0 w-1/2 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/[0.08]" />
    </div>
  );
}
