"use client";

import { useState } from "react";

export function MqlCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Clipboard failed", error);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-black/30">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">MQL5 Expert Advisor</p>
          <p className="text-xs text-slate-500">Drop the file into MetaTrader 5 / Experts and compile.</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-primary-500/40 bg-primary-500/10 px-3 py-1.5 text-xs font-medium text-primary-100 transition hover:bg-primary-500/20"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </header>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </section>
  );
}
