import clsx from "clsx";

export type MetricCardProps = {
  name: string;
  value: number;
  unit?: string;
  hint: string;
  emphasis?: "low" | "medium" | "high";
};

export function MetricCard({ name, value, unit, hint, emphasis = "low" }: MetricCardProps) {
  const accent = {
    low: "border-slate-800",
    medium: "border-primary-500/50",
    high: "border-primary-400"
  }[emphasis];

  return (
    <div
      className={clsx(
        "rounded-xl border bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur",
        accent
      )}
    >
      <p className="text-sm font-medium text-slate-300">{name}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-50">
        {value.toFixed(2)}
        {unit}
      </p>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">{hint}</p>
    </div>
  );
}
