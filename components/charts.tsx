import { cn } from "@/components/ui";

function points(values: number[], width: number, height: number, padding = 10) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const spread = max - min || 1;

  return values
    .map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1);
      const y = height - padding - ((value - min) * (height - padding * 2)) / spread;
      return `${x},${y}`;
    })
    .join(" ");
}

export function LineChart({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 180"
      className={cn("h-full min-h-44 w-full", className)}
      role="img"
      aria-label="Realtime line chart"
    >
      <defs>
        <linearGradient id="lumora-line-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6424" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8a6424" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[32, 68, 104, 140].map((y) => (
        <line
          key={y}
          x1="0"
          x2="480"
          y1={y}
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.08"
        />
      ))}
      <polyline
        points={`10,170 ${points(values, 480, 180, 10)} 470,170`}
        fill="url(#lumora-line-fill)"
        stroke="none"
      />
      <polyline
        points={points(values, 480, 180, 10)}
        fill="none"
        stroke="#8a6424"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      {values.map((value, index) => {
        const coordinate = points(values, 480, 180, 10).split(" ")[index].split(",");
        return (
          <circle
            key={`${value}-${index}`}
            cx={coordinate[0]}
            cy={coordinate[1]}
            r={index === values.length - 1 ? 4.5 : 2.2}
            fill={index === values.length - 1 ? "#171a18" : "#8a6424"}
            className="dark:fill-ink-50"
          />
        );
      })}
    </svg>
  );
}

export function BarChart({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  const max = Math.max(...values);

  return (
    <div
      className={cn("flex h-32 items-end gap-2", className)}
      role="img"
      aria-label="Realtime bar chart"
    >
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex flex-1 items-end rounded-sm bg-ink-100 dark:bg-white/[0.06]"
        >
          <div
            className="w-full rounded-sm bg-ink-800 transition-all duration-700 ease-mass dark:bg-ink-100"
            style={{ height: `${Math.max(14, (value / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export function Waveform({ active = true }: { active?: boolean }) {
  const bars = [42, 64, 36, 78, 52, 88, 44, 68, 32, 74, 56, 38];

  return (
    <div className="flex h-14 items-center gap-1.5" aria-label="Voice activity">
      {bars.map((bar, index) => (
        <span
          key={`${bar}-${index}`}
          className={cn(
            "w-1.5 rounded-full bg-ink-800/80 transition-all duration-700 ease-mass dark:bg-ink-100/80",
            active && "animate-pulseQuiet",
          )}
          style={{
            height: `${bar}%`,
            animationDelay: `${index * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}
