export type VerdictTone = "strong" | "watch" | "attention" | "critical";

export interface Verdict {
  tone: VerdictTone;
  label: string;
  /** Tailwind classes for badge bg + text + border */
  badgeClass: string;
  /** Tailwind ring/border accent for card */
  accentClass: string;
  /** Hex for chart marker */
  markerColor: string;
}

export function getVerdict(percentile: number, smartWarning?: string | null): Verdict {
  if (smartWarning || percentile < 15) {
    return {
      tone: "critical",
      label: "Kritisk",
      badgeClass:
        "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-rose-950/40 dark:text-neutral-300 dark:border-neutral-700",
      accentClass: "border-l-4 border-l-rose-500",
      markerColor: "#525252",
    };
  }
  if (percentile < 40) {
    return {
      tone: "attention",
      label: "Behöver åtgärd",
      badgeClass:
        "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-amber-950/40 dark:text-neutral-300 dark:border-neutral-700",
      accentClass: "border-l-4 border-l-amber-500",
      markerColor: "#d97706",
    };
  }
  if (percentile < 75) {
    return {
      tone: "watch",
      label: "Bevaka",
      badgeClass:
        "bg-neutral-100 text-[#000000] border-black dark:bg-blue-950/40 dark:text-[#000000] dark:border-[#000000]",
      accentClass: "border-l-4 border-l-[#000000]",
      markerColor: "#000000",
    };
  }
  return {
    tone: "strong",
    label: "Stark",
    badgeClass:
      "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-emerald-950/40 dark:text-neutral-300 dark:border-neutral-700",
    accentClass: "border-l-4 border-l-emerald-500",
    markerColor: "#000000",
  };
}

export function percentileLabel(p: number): string {
  if (p >= 95) return "Topp 5%";
  if (p >= 90) return "Topp 10%";
  if (p >= 75) return `P${p}`;
  return `P${p}`;
}

/** Estimate annual financial impact (kr) of closing the gap to P75. */
export function estimateImpactToP75(
  value: number,
  p75: number,
  base: number,
  unit: string,
): number | null {
  if (!base || !isFinite(value) || !isFinite(p75)) return null;
  const gap = p75 - value;
  if (gap <= 0) return 0;
  if (unit === "%") return Math.round((gap / 100) * base);
  return null;
}
