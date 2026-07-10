import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ConfidenceScoreCardProps {
  confidence: number; // 0..1
  countsBySeverity: { critical: number; warning: number; info: number };
}

export function ConfidenceScoreCard({ confidence, countsBySeverity }: ConfidenceScoreCardProps) {
  const pct = Math.round(confidence * 100);
  const tone = pct >= 85 ? "emerald" : pct >= 60 ? "amber" : "rose";

  // F07 · vitt kort med hairline (som dashboarden). Bar + värde bär tonen.
  const toneStyles = {
    emerald: {
      bar: "bg-[#16A34A]",
      icon: "bg-[#E1F5EE] text-[#085041] dark:text-[#1D9E75]",
      value: "text-[#085041] dark:text-emerald-300",
    },
    amber: {
      bar: "bg-[#D97706]",
      icon: "bg-[#FAEEDA] text-[#7A5417] dark:text-[#C28A2B]",
      value: "text-[#7A5417] dark:text-amber-300",
    },
    rose: {
      bar: "bg-[#DC2626]",
      icon: "bg-[#FCE8E8] text-[#7A1A1A] dark:text-[#C73838]",
      value: "text-[#7A1A1A] dark:text-rose-300",
    },
  }[tone];

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 cursor-help transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
            <div className="flex items-start gap-3">
              <div className={cn("rounded-xl w-10 h-10 flex items-center justify-center shrink-0", toneStyles.icon)}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Financial Confidence
                </p>
                <p className={cn("text-2xl font-bold leading-tight mt-0.5 tabular-nums", toneStyles.value)}>
                  {pct}%
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full transition-all", toneStyles.bar)} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Validering, datakomplett & konsistens
                </p>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1 text-xs">
            <p className="font-semibold">Hur poängen beräknas</p>
            <p>• {countsBySeverity.critical} kritiska problem (−25% var)</p>
            <p>• {countsBySeverity.warning} varningar (−8% var)</p>
            <p>• {countsBySeverity.info} info-flaggor (−3% var)</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
