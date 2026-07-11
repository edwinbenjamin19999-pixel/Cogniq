import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { FirmClientEnriched } from "@/hooks/useFirmDashboard";

interface ClientSnapshotCarouselProps {
  clients: FirmClientEnriched[];
  onTap: (clientId: string) => void;
}

const TAG_BY_URGENCY: Record<FirmClientEnriched["urgency"], { label: string; tone: string; Icon: typeof TrendingUp }> = {
  high: { label: "Behöver granskning", tone: "bg-rose-50 text-rose-600 border-rose-200", Icon: TrendingDown },
  medium: { label: "Risk ökar", tone: "bg-amber-50 text-amber-600 border-amber-200", Icon: Minus },
  low: { label: "Stabil", tone: "bg-emerald-50 text-emerald-600 border-emerald-200", Icon: TrendingUp },
};

export const ClientSnapshotCarousel = ({ clients, onTap }: ClientSnapshotCarouselProps) => {
  if (clients.length === 0) return null;
  return (
    <div className="pl-4 pr-2">
      <div className="flex items-center justify-between mb-2 pr-2">
        <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold">
          Klient-snapshot
        </h2>
        <span className="text-[10px] text-[#94A3B8]">{clients.length} st</span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-3 -mr-2 pr-4 scrollbar-none">
        {clients.map((c) => {
          const tag = TAG_BY_URGENCY[c.urgency];
          const Icon = tag.Icon;
          return (
            <button
              key={c.id}
              onClick={() => onTap(c.id)}
              className={cn(
                "snap-start flex-shrink-0 w-[180px] rounded-2xl p-3 text-left",
                "bg-white border border-[#E2E8F0] shadow-sm",
                "active:scale-[0.97] transition-transform duration-150",
              )}
            >
              <div className="text-sm font-semibold text-[#0F172A] truncate">{c.name}</div>
              <div className={cn(
                "inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium",
                tag.tone,
              )}>
                <Icon className="h-2.5 w-2.5" />
                {tag.label}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <SnapKpi label="Alerts" value={String(c.alerts)} accent={c.alerts > 0} />
                <SnapKpi label="Utkast" value={String(c.draftEntries)} />
                <SnapKpi label="Förfall" value={String(c.overdueInvoices)} accent={c.overdueInvoices > 0} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SnapKpi = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <div className="text-[9px] uppercase text-[#94A3B8] tracking-wider">{label}</div>
    <div className={cn(
      "text-sm font-bold tabular-nums",
      accent ? "text-rose-600" : "text-[#0F172A]",
    )}>{value}</div>
  </div>
);
