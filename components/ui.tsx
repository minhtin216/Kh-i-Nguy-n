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
    primary: [
      "bg-ink-900 text-white",
      "hover:bg-ink-800",
      "shadow-sm",
      /* dark */
      "dark:bg-[#d4b87a] dark:text-ink-950 dark:hover:bg-[#c9ac6a]",
    ].join(" "),

    secondary: [
      "border border-ink-200 bg-white text-ink-900",
      "hover:bg-ink-100 hover:border-ink-300",
      "shadow-sm",
      /* dark */
      "dark:border-white/[0.10] dark:bg-white/[0.06] dark:text-ink-50",
      "dark:hover:bg-white/[0.10] dark:hover:border-white/[0.16]",
    ].join(" "),

    ghost: [
      "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
      /* dark */
      "dark:text-ink-300 dark:hover:bg-white/[0.07] dark:hover:text-ink-50",
    ].join(" "),

    danger: [
      "border border-red-200 bg-red-50 text-red-800",
      "hover:bg-red-100",
      /* dark */
      "dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
      "dark:hover:bg-red-400/15",
    ].join(" "),
  };

  return (
    <button
      className={cn(
        /* base */
        "group inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold",
        "transition-all duration-200 ease-smooth",
        "active:scale-[0.96]",
        "disabled:pointer-events-none disabled:opacity-38",
        /* focus ring */
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-brass-500/60 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[--page-bg]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="grid size-4 shrink-0 place-items-center">
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
        /* light */
        "rounded-2xl border border-ink-200/80 bg-white shadow-panel",
        /* dark */
        "dark:border-white/[0.07] dark:bg-[#1f1d1a] dark:shadow-panel-dark",
        /* transition */
        "transition-colors duration-300 ease-smooth",
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
      "bg-ink-100 text-ink-700 ring-ink-200/80 dark:bg-white/[0.07] dark:text-ink-300 dark:ring-white/[0.09]",
    green:
      "bg-[#ebf5ea] text-[#2d5a30] ring-[#c9e3c7] dark:bg-emerald-400/[0.12] dark:text-emerald-300 dark:ring-emerald-400/[0.18]",
    yellow:
      "bg-[#fdf5e0] text-[#8a5c00] ring-[#edda9e] dark:bg-amber-400/[0.12] dark:text-amber-300 dark:ring-amber-400/[0.18]",
    red:
      "bg-[#fdecea] text-[#8f2b28] ring-[#f0ccc8] dark:bg-red-400/[0.12] dark:text-red-300 dark:ring-red-400/[0.18]",
    blue:
      "bg-[#e0f2fe] text-[#1a5f8e] ring-[#bae0f7] dark:bg-sky-400/[0.12] dark:text-sky-300 dark:ring-sky-400/[0.18]",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5",
        "text-[10.5px] font-bold uppercase tracking-[0.08em] ring-1",
        "transition-colors duration-300 ease-smooth",
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
    neutral: "bg-ink-100 text-ink-700 dark:bg-white/[0.08] dark:text-ink-200",
    green:   "bg-[#ebf5ea] text-[#2d5a30] dark:bg-emerald-400/[0.12] dark:text-emerald-300",
    yellow:  "bg-[#fdf5e0] text-[#8a5c00] dark:bg-amber-400/[0.12] dark:text-amber-300",
    red:     "bg-[#fdecea] text-[#8f2b28] dark:bg-red-400/[0.12] dark:text-red-300",
    blue:    "bg-[#e0f2fe] text-[#1a5f8e] dark:bg-sky-400/[0.12] dark:text-sky-300",
  };

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl",
          "text-xs font-bold ring-1 ring-black/[0.07] dark:ring-white/[0.07]",
          "transition-colors duration-300 ease-smooth",
          tones[tone],
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight text-ink-900 dark:text-ink-50 transition-colors duration-300">
          {name}
        </p>
        {role ? (
          <p className="mt-0.5 truncate text-xs leading-tight text-ink-700/60 dark:text-ink-300/60 transition-colors duration-300">
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
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
        /* backdrop */
        "bg-ink-950/50 backdrop-blur-md",
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "w-full max-w-lg animate-fade-up",
          "rounded-2xl border",
          /* light */
          "border-ink-200/80 bg-white",
          "shadow-[0_24px_64px_-16px_rgba(20,18,16,0.28),0_0_0_1px_rgba(20,18,16,0.04)]",
          /* dark */
          "dark:border-white/[0.08] dark:bg-[#1a1815]",
          "dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65)]",
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-200/70 px-5 py-4 dark:border-white/[0.07]">
          <div>
            <h2 className="text-base font-bold tracking-tight text-ink-900 dark:text-ink-50">
              {title}
            </h2>
            {description ? (
              <p className="mt-0.5 text-xs leading-5 text-ink-700/60 dark:text-ink-300/60">
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
        {/* Body */}
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
        "relative overflow-hidden rounded-lg",
        "bg-ink-100 dark:bg-white/[0.06]",
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="absolute inset-y-0 w-1/3 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/[0.07]" />
    </div>
  );
}
