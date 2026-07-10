/**
 * KPI Card Design Tokens — single source of truth for ReportKpiCard surface + accent styling.
 * Used by ReportKpiCard v2 and any wrapper/shim that delegates to it.
 */

export type KpiTone = "neutral" | "positive" | "negative" | "warning";
export type KpiAccent = "default" | "emerald" | "rose" | "slate" | "cyan" | "amber";

export interface ToneStyle {
  surface: string;     // gradient bg classes
  border: string;      // border classes
  trendPositive: string;
  trendNegative: string;
}

export interface AccentStyle {
  bg: string;
  fg: string;
  stroke: string; // for sparkline
}

// F07 · alla kort vita med #E2E8F0-hairline (som dashboarden). Tonen bärs av
// ikon-chip, trend-pill och insight — inte av ytan.
const F07_SURFACE = "bg-white dark:bg-slate-900";
const F07_BORDER = "border-[#E2E8F0] dark:border-slate-800";

export const TONE_STYLES: Record<KpiTone, ToneStyle> = {
  neutral: {
    surface: F07_SURFACE,
    border: F07_BORDER,
    trendPositive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    trendNegative: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
  positive: {
    surface: F07_SURFACE,
    border: F07_BORDER,
    trendPositive: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    trendNegative: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
  negative: {
    surface: F07_SURFACE,
    border: F07_BORDER,
    trendPositive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    trendNegative: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  },
  warning: {
    surface: F07_SURFACE,
    border: F07_BORDER,
    trendPositive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    trendNegative: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

export const ACCENT_STYLES: Record<KpiAccent, AccentStyle> = {
  default: { bg: "bg-slate-900/[0.06]", fg: "text-slate-700 dark:text-slate-300", stroke: "stroke-slate-500" },
  emerald: { bg: "bg-emerald-500/[0.08]", fg: "text-emerald-600 dark:text-[#1D9E75]", stroke: "stroke-emerald-500" },
  rose:    { bg: "bg-rose-500/[0.08]",    fg: "text-rose-600 dark:text-[#C73838]",       stroke: "stroke-rose-500" },
  slate:   { bg: "bg-slate-900/[0.06]",   fg: "text-slate-700 dark:text-slate-300",     stroke: "stroke-slate-500" },
  cyan:    { bg: "bg-[#0052FF]/[0.08]",    fg: "text-[#0052FF] dark:text-[#1E3A5F]",       stroke: "stroke-[#0052FF]" },
  amber:   { bg: "bg-amber-500/[0.10]",   fg: "text-amber-600 dark:text-[#C28A2B]",     stroke: "stroke-amber-500" },
};

/**
 * Semantic kind → accent + tone defaults. Used by `kind` shortcut on ReportKpiCard.
 * Tone for `profit` is resolved at render time based on numeric sign.
 */
export type KpiKind = "revenue" | "cost" | "profit" | "asset" | "liability" | "neutral";

export interface KindDefault {
  accent: KpiAccent;
  tone: KpiTone;
}

export const KIND_DEFAULTS: Record<KpiKind, KindDefault> = {
  revenue:   { accent: "cyan",    tone: "neutral" },
  cost:      { accent: "rose",    tone: "neutral" },
  profit:    { accent: "emerald", tone: "positive" },
  asset:     { accent: "default", tone: "neutral" },
  liability: { accent: "amber",   tone: "warning" },
  neutral:   { accent: "default", tone: "neutral" },
};
