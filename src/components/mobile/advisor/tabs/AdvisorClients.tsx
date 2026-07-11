import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowDownUp } from "lucide-react";
import { useAdvisorContext } from "@/hooks/useAdvisorContext";
import { PriorityClientCard } from "../PriorityClientCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SortKey = "alerts" | "name";

export const AdvisorClients = () => {
  const { clients, isLoading } = useAdvisorContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("alerts");

  const filtered = useMemo(() => {
    const list = clients.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    );
    return list.sort((a, b) =>
      sort === "alerts" ? b.alerts - a.alerts : a.name.localeCompare(b.name, "sv"),
    );
  }, [clients, query, sort]);

  return (
    <div className="space-y-3 p-4 pb-4">
      <h1 className="text-xl font-bold text-[#0F172A]">Klienter</h1>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök företag…"
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0052FF]"
          />
        </div>
        <button
          onClick={() => setSort((s) => (s === "alerts" ? "name" : "alerts"))}
          className={cn(
            "h-10 px-3 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#475569] active:scale-95 transition-all flex items-center gap-1.5",
          )}
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
          {sort === "alerts" ? "Risk" : "Namn"}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 bg-[#E2E8F0]" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 text-center">
          <div className="text-sm text-[#64748B]">Inga klienter matchar</div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <PriorityClientCard key={c.id} client={c} onTap={(id) => navigate(`/firm/client/${id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};
