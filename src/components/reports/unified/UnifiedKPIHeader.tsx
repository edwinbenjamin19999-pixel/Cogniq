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

// F07 · alla kort är vita med #E2E8F0-hairline (som dashboarden). Semantiken
// bärs av den pastellfärgade ikon-chippen, värdet är alltid ink.
const TONE: Record<KpiCardProps["tone"], { icon: string }> = {
  emerald: { icon: "bg-[#E1F5EE] text-[#085041] dark:text-[#1D9E75]" },
  rose: { icon: "bg-[#FCE8E8] text-[#7A1A1A] dark:text-[#C73838]" },
  cyan: { icon: "bg-[#EFF6FF] text-[#0052FF] dark:text-[#1E3A5F]" },
  indigo: { icon: "bg-[#EFF6FF] text-indigo-600 dark:text-indigo-400" },
  amber: { icon: "bg-[#FAEEDA] text-[#7A5417] dark:text-[#C28A2B]" },
  slate: { icon: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
};

function KpiCard({ label, value, subtext, icon: Icon, tone, formatAsAbs }: KpiCardProps) {
  const t = TONE[tone];
  const display = formatAsAbs ? formatSEK(Math.abs(value)) : formatSEK(value);
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
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
          <p
            className="text-[15px] font-bold leading-tight mt-0.5 tabular-nums whitespace-nowrap text-[#0F172A] dark:text-slate-50"
            title={display}
          >
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
