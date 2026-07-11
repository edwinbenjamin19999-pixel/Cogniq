import { cn } from "@/lib/utils";

interface PriorityBannerProps {
  total: number;
  critical: number;
  warning: number;
  healthy: number;
}

export const PriorityBanner = ({ total, critical, warning, healthy }: PriorityBannerProps) => {
  const needsAttention = critical + warning;
  const headline = needsAttention === 0
    ? "Allt under kontroll"
    : `${needsAttention} ${needsAttention === 1 ? "klient kräver" : "klienter kräver"} din uppmärksamhet`;

  return (
    <div className="px-4 pt-4 pb-3">
      <h1 className="text-[22px] font-bold text-[#0F172A] leading-tight tracking-tight">
        {headline}
      </h1>
      <p className="text-xs text-[#64748B] mt-1">{total} aktiva mandat</p>

      <div className="flex items-center gap-2 mt-3">
        <Pill count={critical} label="Kritiska" tone="critical" pulse />
        <Pill count={warning} label="Varningar" tone="warning" />
        <Pill count={healthy} label="Friska" tone="healthy" />
      </div>
    </div>
  );
};

const Pill = ({
  count, label, tone, pulse = false,
}: { count: number; label: string; tone: "critical" | "warning" | "healthy"; pulse?: boolean }) => {
  const styles = {
    critical: "bg-rose-50 text-rose-600 border-rose-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    healthy: "bg-emerald-50 text-emerald-600 border-emerald-200",
  } as const;
  const dot = {
    critical: "bg-rose-400",
    warning: "bg-amber-400",
    healthy: "bg-emerald-400",
  } as const;
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold tabular-nums backdrop-blur-md",
      styles[tone],
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[tone], pulse && count > 0 && "animate-pulse")} />
      <span>{count}</span>
      <span className="text-[#64748B] font-normal">{label}</span>
    </div>
  );
};
