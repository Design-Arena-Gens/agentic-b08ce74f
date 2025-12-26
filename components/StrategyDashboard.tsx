"use client";

import { useMemo, useState } from "react";
import { DecisionPanel } from "@/components/DecisionPanel";
import { MetricCard } from "@/components/MetricCard";
import { MetricSlider } from "@/components/MetricSlider";
import {
  evaluateSnapshot,
  type MarketSnapshot,
  type StrategyConfig
} from "@/lib/metrics";
import { MqlCodeBlock } from "@/components/MqlCodeBlock";

const DEFAULT_CONFIG: StrategyConfig = {
  frequencyThreshold: 12,
  momentumThreshold: 0.18,
  liquidityThreshold: 20,
  potentialThreshold: 4,
  maxSpread: 1.8
};

const DEFAULT_SNAPSHOT: MarketSnapshot = {
  tickFrequency: 14,
  momentum: 0.26,
  liquidity: 24,
  potential: 4.8,
  spread: 1.1
};

export function StrategyDashboard({ code }: { code: string }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [snapshot, setSnapshot] = useState(DEFAULT_SNAPSHOT);

  const decision = useMemo(() => evaluateSnapshot(snapshot, config), [snapshot, config]);

  function randomizeSnapshot() {
    setSnapshot((prev) => ({
      tickFrequency: Math.max(2, Math.round(normalRandom(prev.tickFrequency, 3, 0.3))),
      momentum: truncate(normalRandom(prev.momentum, 0.12, 0.05), 3),
      liquidity: truncate(normalRandom(prev.liquidity, 10, 0.2), 2),
      potential: truncate(normalRandom(prev.potential, 2, 0.15), 2),
      spread: truncate(Math.abs(normalRandom(prev.spread, 0.4, 0.25)), 2)
    }));
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/30">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-100">
                  High-Frequency Liquidity Scanner
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Tune order-flow thresholds and preview the resulting trade stance before
                  deploying the MQL5 expert.
                </p>
              </div>
              <button
                type="button"
                onClick={randomizeSnapshot}
                className="rounded-lg border border-primary-500/40 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-100 transition hover:bg-primary-500/20"
              >
                Inject Live Tick
              </button>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                name="Tick Frequency"
                value={snapshot.tickFrequency}
                unit="/s"
                hint="Number of ticks arriving per second during the rolling window."
                emphasis={snapshot.tickFrequency >= config.frequencyThreshold ? "high" : "medium"}
              />
              <MetricCard
                name="Momentum"
                value={snapshot.momentum}
                unit=" pts"
                hint="Signed price velocity measured in points."
                emphasis={Math.abs(snapshot.momentum) >= config.momentumThreshold ? "high" : "medium"}
              />
              <MetricCard
                name="Visible Liquidity"
                value={snapshot.liquidity}
                unit=" lots"
                hint="Summed depth from Level-II order book."
                emphasis={snapshot.liquidity >= config.liquidityThreshold ? "high" : "low"}
              />
              <MetricCard
                name="Range Potential"
                value={snapshot.potential}
                unit=" pts"
                hint="Scaled ATR measuring exploitable range."
                emphasis={snapshot.potential >= config.potentialThreshold ? "high" : "low"}
              />
            </div>
          </div>
          <DecisionPanel decision={decision} />
        </div>
        <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/30">
          <h2 className="text-lg font-semibold text-slate-100">Strategy Thresholds</h2>
          <MetricSlider
            label="Tick Frequency Trigger"
            description="Minimum ticks per second required to consider a trade."
            unit="/s"
            min={2}
            max={30}
            step={1}
            value={config.frequencyThreshold}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, frequencyThreshold: value }))
            }
          />
          <MetricSlider
            label="Momentum Trigger"
            description="Absolute price velocity in points needed for directional conviction."
            unit=" pts"
            min={0.05}
            max={1}
            step={0.01}
            value={config.momentumThreshold}
            onChange={(value) => setConfig((prev) => ({ ...prev, momentumThreshold: value }))}
          />
          <MetricSlider
            label="Liquidity Floor"
            description="Total opposing volume required in the top-of-book."
            unit=" lots"
            min={5}
            max={60}
            step={1}
            value={config.liquidityThreshold}
            onChange={(value) => setConfig((prev) => ({ ...prev, liquidityThreshold: value }))}
          />
          <MetricSlider
            label="Range Potential"
            description="ATR-derived range needed to justify the trade risk."
            unit=" pts"
            min={1}
            max={12}
            step={0.2}
            value={config.potentialThreshold}
            onChange={(value) => setConfig((prev) => ({ ...prev, potentialThreshold: value }))}
          />
          <MetricSlider
            label="Max Spread"
            description="Abort when the spread widens beyond this many points."
            unit=" pts"
            min={0.2}
            max={4}
            step={0.05}
            value={config.maxSpread}
            onChange={(value) => setConfig((prev) => ({ ...prev, maxSpread: value }))}
          />
        </section>
      </section>

      <section>
        <MqlCodeBlock code={code} />
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <p>Download the compiled source to place under <code>MQL5/Experts/HFT</code>.</p>
          <a
            href="/bot/HFT_LiquidityPulse.mq5"
            className="rounded-lg border border-primary-500/40 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-100 transition hover:bg-primary-500/20"
            download
          >
            Download Expert Advisor
          </a>
        </div>
      </section>
    </main>
  );
}

function normalRandom(mean: number, deviation: number, jitter: number): number {
  const u = Math.random();
  const v = Math.random();
  const gaussian = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + gaussian * deviation * (1 + jitter * (Math.random() - 0.5));
}

function truncate(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
