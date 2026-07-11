import { useRef, useState } from "react";
import { ChevronRight, Check, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FirmClientEnriched } from "@/hooks/useFirmDashboard";
import { getTopIssue } from "@/hooks/useClientIssues";

interface PriorityClientCardProps {
  client: FirmClientEnriched;
  onTap: (clientId: string) => void;
  onApprove?: (clientId: string) => void;
  onFlag?: (clientId: string) => void;
}

const URGENCY_BAR = {
  high: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
  medium: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]",
  low: "bg-emerald-400",
} as const;

export const PriorityClientCard = ({ client, onTap, onApprove, onFlag }: PriorityClientCardProps) => {
  const issue = getTopIssue(client);
  const startX = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const moved = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 6) moved.current = true;
    setDx(Math.max(-120, Math.min(120, delta)));
  };
  const onPointerUp = () => {
    if (dx > 100) onApprove?.(client.id);
    else if (dx < -100) onFlag?.(client.id);
    else if (!moved.current) onTap(client.id);
    startX.current = null;
    setDx(0);
  };

  return (
    <div className="relative touch-pan-y">
      <div className="absolute inset-0 flex items-center justify-between px-5 rounded-2xl overflow-hidden pointer-events-none">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
          <Check className="h-4 w-4" /> Godkänn
        </div>
        <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
          Flagga <Flag className="h-4 w-4" />
        </div>
      </div>

      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { startX.current = null; setDx(0); }}
        style={{ transform: `translateX(${dx}px)`, transition: dx === 0 ? "transform 200ms cubic-bezier(0.2,0,0,1)" : "none" }}
        className={cn(
          "relative w-full text-left rounded-2xl overflow-hidden",
          "bg-white border border-[#E2E8F0]",
          "shadow-sm",
          "active:bg-[#F8FAFC]",
        )}
      >
        <div className="flex">
          <div className={cn("w-[3px] flex-shrink-0", URGENCY_BAR[client.urgency])} />
          <div className="flex-1 p-3.5 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-[#0F172A] truncate">
                  {client.name}
                </div>
                {issue && (
                  <div className={cn(
                    "text-xs mt-0.5 truncate",
                    issue.severity === "critical" ? "text-rose-600" :
                    issue.severity === "warning" ? "text-amber-600" : "text-[#64748B]"
                  )}>
                    {issue.text}
                  </div>
                )}
                {!issue && (
                  <div className="text-xs mt-0.5 text-emerald-600">Inga öppna ärenden</div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-[#94A3B8] flex-shrink-0 mt-0.5" />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">
              <Mini label="Verifikat" value={String(client.draftEntries)} />
              <Mini label="Förfallet" value={String(client.overdueInvoices)} accent={client.overdueInvoices > 0} />
              <Mini label="Utlägg" value={String(client.pendingExpenses)} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const Mini = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">{label}</div>
    <div className={cn(
      "text-sm font-bold tabular-nums",
      accent ? "text-rose-600" : "text-[#0F172A]"
    )}>{value}</div>
  </div>
);
