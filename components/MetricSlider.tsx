"use client";

import { useId } from "react";
import clsx from "clsx";

export type MetricSliderProps = {
  label: string;
  description?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export function MetricSlider({
  label,
  description,
  unit,
  min = 0,
  max = 2,
  step = 0.01,
  value,
  onChange
}: MetricSliderProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-medium text-sm text-slate-200">
          {label}
        </label>
        <span className="text-xs text-slate-400">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit}
        </span>
      </div>
      {description && (
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={clsx(
          "w-full appearance-none h-2 rounded-lg",
          "bg-slate-800 accent-primary-500"
        )}
      />
    </div>
  );
}
