import { Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FirmClientEnriched } from "@/hooks/useFirmDashboard";

interface DeadlineItem {
  id: string;
  title: string;
  clientName: string;
  bucket: "today" | "week";
  urgent: boolean;
}

interface AdvisorDeadlinesPanelProps {
  clients: FirmClientEnriched[];
}

function generateDeadlines(clients: FirmClientEnriched[]): DeadlineItem[] {
  const out: DeadlineItem[] = [];
  for (const c of clients) {
    if (c.overdueInvoices > 0) {
      out.push({
        id: `${c.id}-overdue`,
        title: `${c.overdueInvoices} förfallna fakturor`,
        clientName: c.name,
        bucket: "today",
        urgent: true,
      });
    }
    if (c.draftEntries > 5) {
      out.push({
        id: `${c.id}-drafts`,
        title: "Verifikat att granska",
        clientName: c.name,
        bucket: "week",
        urgent: false,
      });
    }
  }
  return out.slice(0, 8);
}

export const AdvisorDeadlinesPanel = ({ clients }: AdvisorDeadlinesPanelProps) => {
  const items = generateDeadlines(clients);
  if (items.length === 0) return null;

  const today = items.filter((i) => i.bucket === "today");
  const week = items.filter((i) => i.bucket === "week");

  return (
    <div className="px-4 space-y-4">
      {today.length > 0 && <Group title="Idag" items={today} />}
      {week.length > 0 && <Group title="Denna vecka" items={week} />}
    </div>
  );
};

const Group = ({ title, items }: { title: string; items: DeadlineItem[] }) => (
  <div>
    <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold mb-2">
      {title}
    </h3>
    <div className="space-y-1.5">
      {items.map((it) => (
        <div
          key={it.id}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5",
            "bg-white border border-[#E2E8F0] shadow-sm",
          )}
        >
          <div className={cn(
            "h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0",
            it.urgent ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600",
          )}>
            {it.urgent ? <AlertCircle className="h-3.5 w-3.5" /> : <Calendar className="h-3.5 w-3.5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-[#0F172A] truncate">{it.title}</div>
            <div className="text-[11px] text-[#64748B] truncate">{it.clientName}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

