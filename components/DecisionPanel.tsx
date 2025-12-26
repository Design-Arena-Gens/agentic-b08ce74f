import { formatDirection, type TradeDecision } from "@/lib/metrics";
import clsx from "clsx";

type Props = {
  decision: TradeDecision;
};

export function DecisionPanel({ decision }: Props) {
  const state = decision.direction;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/30">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Signal Verdict</h2>
        <span
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            state === "long" && "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
            state === "short" && "bg-rose-500/20 text-rose-200 border border-rose-500/40",
            state === "flat" && "bg-slate-700 text-slate-300 border border-slate-600"
          )}
        >
          {formatDirection(state)}
        </span>
      </header>
      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3">
          <span className="text-xs uppercase tracking-wide text-slate-500">Conviction</span>
          <span className="text-lg font-semibold text-slate-100">
            {(decision.normalizedScore * 100).toFixed(1)}%
          </span>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Rationales</p>
          {decision.reasons.length > 0 ? (
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {decision.reasons.map((reason) => (
                <li key={reason} className="leading-relaxed">
                  • {reason}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-400">Signal passes risk filters.</p>
          )}
        </div>
      </div>
    </section>
  );
}
