import { CheckCircle2, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSEK } from "@/lib/formatNumber";

interface BalanceStatusCardProps {
  balanced: boolean;
  difference: number;
  onInvestigate?: () => void;
}

export function BalanceStatusCard({ balanced, difference, onInvestigate }: BalanceStatusCardProps) {
  return (
    <button
      type="button"
      onClick={onInvestigate}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left w-full transition-all duration-200",
        "border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5",
        balanced
          ? "border-border ring-1 ring-neutral-700/15 dark:ring-neutral-700/20"
          : "border-border ring-1 ring-neutral-700/20 dark:ring-neutral-700/25",
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-px", balanced ? "bg-neutral-700/70 dark:bg-neutral-700/80" : "bg-neutral-700/80 dark:bg-neutral-700/90")} />
      <div className="px-5 py-4 flex items-start gap-3">
        <div
          className={cn(
            "rounded-xl w-10 h-10 flex items-center justify-center shrink-0",
            balanced
              ? "bg-[#E1F5EE] text-[#085041] dark:text-[#1D9E75]"
              : "bg-[#FCE8E8] text-[#7A1A1A] dark:text-[#C73838]",
          )}
        >
          {balanced ? <CheckCircle2 className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Balansstatus
          </p>
          <p
            className={cn(
              "text-lg font-bold leading-tight mt-0.5",
              balanced ? "text-[#085041] dark:text-neutral-300" : "text-[#7A1A1A] dark:text-neutral-300",
            )}
          >
            {balanced ? "✔ I balans" : "❌ Ej i balans"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 tabular-nums">
            {balanced
              ? "Tillgångar = Eget kapital + Skulder"
              : `Differens: ${formatSEK(Math.abs(difference))}`}
          </p>
          {!balanced && onInvestigate && (
            <p className="text-[11px] font-medium text-[#7A1A1A] dark:text-neutral-300 mt-2 group-hover:underline">
              Klicka för att undersöka →
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
