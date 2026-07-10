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
        "group relative overflow-hidden rounded-xl text-left w-full transition-shadow duration-200",
        "border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)]",
      )}
    >
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
              balanced ? "text-[#085041] dark:text-emerald-300" : "text-[#7A1A1A] dark:text-rose-300",
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
            <p className="text-[11px] font-medium text-[#7A1A1A] dark:text-rose-300 mt-2 group-hover:underline">
              Klicka för att undersöka →
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
