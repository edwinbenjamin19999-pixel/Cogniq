import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  Building2,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSEK } from "@/lib/formatNumber";
import type { FinancialKpis } from "@/hooks/useFinancialEngine";
import type { ValidationReport } from "@/lib/reports/validationEngine";
import { BalanceStatusCard } from "./BalanceStatusCard";
import { ConfidenceScoreCard } from "./ConfidenceScoreCard";

interface UnifiedKPIHeaderProps {
  kpis: FinancialKpis;
  validation: ValidationReport;
  hasData: boolean;
  onInvestigateImbalance: () => void;
}

interface KpiCardProps {
  label: string;
  value: number;
  subtext: string;
  icon: LucideIcon;
  tone: "emerald" | "rose" | "cyan" | "indigo" | "amber" | "slate";
  formatAsAbs?: boolean;
}

const TONE: Record<KpiCardProps["tone"], { shell: string; accent: string; icon: string; value: string }> = {
  emerald: {
    shell: "bg-card border-border ring-1 ring-neutral-700/15 dark:ring-neutral-700/20",
    accent: "bg-neutral-700/70 dark:bg-neutral-700/80",
    icon: "bg-[#E1F5EE] text-[#085041] dark:text-[#1D9E75]",
    value: "text-[#085041] dark:text-neutral-300",
  },
  rose: {
    shell: "bg-card border-border ring-1 ring-neutral-700/15 dark:ring-neutral-700/20",
    accent: "bg-neutral-700/70 dark:bg-neutral-700/80",
    icon: "bg-[#FCE8E8] text-[#7A1A1A] dark:text-[#C73838]",
    value: "text-[#7A1A1A] dark:text-neutral-300",
  },
  cyan: {
    shell: "bg-card border-border ring-1 ring-[#000000]/15 dark:ring-[#000000]/20",
    accent: "bg-[#000000]/70 dark:bg-[#000000]/80",
    icon: "bg-[#EFF6FF] text-[#000000] dark:text-[#1E3A5F]",
    value: "text-[#000000] dark:text-[#000000]",
  },
  indigo: {
    shell: "bg-card border-border ring-1 ring-neutral-700/15 dark:ring-neutral-700/20",
    accent: "bg-neutral-700/70 dark:bg-neutral-700/80",
    icon: "bg-[#EFF6FF] text-neutral-700 dark:text-neutral-700",
    value: "text-neutral-700 dark:text-neutral-300",
  },
  amber: {
    shell: "bg-card border-border ring-1 ring-neutral-700/15 dark:ring-neutral-700/20",
    accent: "bg-neutral-700/70 dark:bg-neutral-700/80",
    icon: "bg-[#FAEEDA] text-[#7A5417] dark:text-[#C28A2B]",
    value: "text-[#7A5417] dark:text-neutral-300",
  },
  slate: {
    shell: "bg-card border-border ring-1 ring-foreground/10",
    accent: "bg-foreground/50",
    icon: "bg-muted text-muted-foreground",
    value: "text-foreground",
  },
};

function KpiCard({ label, value, subtext, icon: Icon, tone, formatAsAbs }: KpiCardProps) {
  const t = TONE[tone];
  const display = formatAsAbs ? formatSEK(Math.abs(value)) : formatSEK(value);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5",
        t.shell,
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-px", t.accent)} />
      <div className="px-5 py-4 flex items-start gap-3">
        <div className={cn("rounded-xl w-10 h-10 flex items-center justify-center shrink-0", t.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground leading-tight whitespace-normal break-words"
            title={label}
          >
            {label}
          </p>
          <p className={cn("text-xl font-bold leading-tight mt-0.5 tabular-nums truncate", t.value)} title={display}>
            {display}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">{subtext}</p>
        </div>
      </div>
    </div>
  );
}

export function UnifiedKPIHeader({
  kpis,
  validation,
  hasData,
  onInvestigateImbalance,
}: UnifiedKPIHeaderProps) {
  if (!hasData) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 p-12 text-center">
        <p className="text-sm text-muted-foreground">Inga godkända verifikationer i vald period</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {/* Top row — 6 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        <KpiCard label="Intäkter" value={kpis.revenue} subtext="Aktuell period" icon={TrendingUp} tone="emerald" />
        <KpiCard label="Kostnader" value={kpis.costs} subtext="Aktuell period" icon={TrendingDown} tone="rose" />
        <KpiCard
          label="Resultat"
          value={kpis.result}
          subtext={kpis.result >= 0 ? `Marginal ${kpis.marginPct.toFixed(1)}%` : "Förlust"}
          icon={PiggyBank}
          tone={kpis.result >= 0 ? "emerald" : "rose"}
        />
        <KpiCard label="Tillgångar" value={kpis.assets} subtext="Utgående balans" icon={Wallet} tone="cyan" formatAsAbs />
        <KpiCard label="Eget kapital" value={kpis.equity} subtext="Utgående balans" icon={Building2} tone="indigo" formatAsAbs />
        <KpiCard label="Skulder" value={kpis.liabilities} subtext="Utgående balans" icon={Receipt} tone="amber" formatAsAbs />
      </div>

      {/* Second row — Balance Status (dominant) + Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
        <BalanceStatusCard
          balanced={validation.balanced}
          difference={validation.imbalanceDiff}
          onInvestigate={onInvestigateImbalance}
        />
        <ConfidenceScoreCard
          confidence={validation.confidence}
          countsBySeverity={validation.countsBySeverity}
        />
      </div>
    </section>
  );
}
