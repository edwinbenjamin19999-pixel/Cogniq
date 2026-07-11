import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wallet, TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { CashFlowKPI } from "@/hooks/useCashFlow";

const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

const MiniSparkline = () => { const points = "0,20 13,16 27,18 40,10 53,14 67,6 80,8";
  const fillPoints = `${points} 80,24 0,24`;
  return (
    <svg width="80" height="24" viewBox="0 0 80 24">
      <polyline points={fillPoints} fill="currentColor" fillOpacity="0.12" stroke="none" />
      <polyline points={points} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

interface Props { kpi: CashFlowKPI;
  onCardClick?: (card: string) => void;
}

export function CashFlowKPICards({ kpi, onCardClick }: Props) { const runwayMonths = (kpi.runwayDays / 30).toFixed(1);
  
  const netChange = kpi.netCashFlowPrevMTD !== 0
    ? Math.round(((kpi.netCashFlowMTD - kpi.netCashFlowPrevMTD) / Math.abs(kpi.netCashFlowPrevMTD)) * 100)
    : 0;

  const cards = [
    { id: "balance",
      icon: <Wallet className="w-7 h-7 opacity-40" />,
      label: "KASSASALDO IDAG",
      value: `${fmt(kpi.cashBalance)} kr`,
      sub: "Senast uppdaterad: idag",
      tooltip: "Summa av konto 1910–1940 vid dagens datum",
      gradient: "bg-[#0052FF]",
    },
    { id: "net-mtd",
      icon: kpi.netCashFlowMTD >= 0
        ? <TrendingUp className="w-7 h-7 opacity-40" />
        : <TrendingDown className="w-7 h-7 opacity-40" />,
      label: "NETTOKASSAFLÖDE",
      value: `${kpi.netCashFlowMTD >= 0 ? "+" : ""}${fmt(kpi.netCashFlowMTD)} kr`,
      sub: netChange !== 0 ? `${netChange > 0 ? "↑" : "↓"} ${Math.abs(netChange)}% vs förra månaden` : "Denna månad",
      tooltip: "Summa inbetalningar minus utbetalningar hittills denna månad",
      gradient: kpi.netCashFlowMTD >= 0
        ? "bg-white border border-[#E2E8F0]"
        : "bg-white border border-[#E2E8F0]",
    },
    { id: "runway",
      icon: <Clock className="w-7 h-7 opacity-40" />,
      label: "RUNWAY",
      value: kpi.runwayDays >= 999 ? "∞" : `${kpi.runwayDays} dagar`,
      sub: kpi.runwayDays < 999
        ? `${runwayMonths} mån · Tar slut: ${kpi.runwayDate}`
        : "Ingen risk identifierad",
      tooltip: "Runway = Kassasaldo ÷ Genomsnittligt dagligt nettoutflöde (senaste 90 dagar)",
      gradient: kpi.runwayDays > 90
        ? "bg-white border border-[#E2E8F0]"
        : kpi.runwayDays > 30
          ? "bg-white border border-[#E2E8F0]"
          : "bg-white border border-[#E2E8F0]",
    },
    { id: "expected-in",
      icon: <ArrowUpRight className="w-7 h-7 opacity-40" />,
      label: "FÖRVÄNTADE INBETALNINGAR",
      value: `${fmt(kpi.expectedInflows30d)} kr`,
      sub: `${kpi.expectedInflowsCount} fakturor inom 30 dagar`,
      tooltip: "Summa öppna kundfakturor som förfaller inom 30 dagar",
      gradient: "bg-white border border-[#E2E8F0]",
    },
    { id: "expected-out",
      icon: <ArrowDownRight className="w-7 h-7 opacity-40" />,
      label: "FÖRVÄNTADE UTBETALNINGAR",
      value: `${fmt(kpi.expectedOutflows30d)} kr`,
      sub: kpi.vatDueDate ? `varav moms ${kpi.vatDueDate}: ${fmt(kpi.vatDueAmount)} kr` : "Inom 30 dagar",
      tooltip: "Summa öppna leverantörsfakturor + kända förpliktelser inom 30 dagar",
      gradient: "bg-white border border-[#E2E8F0]",
    },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map(card => (
          <Tooltip key={card.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onCardClick?.(card.id)}
                className={`${card.gradient} ${card.id === "balance" ? "text-white" : "text-[#0F172A]"} rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative overflow-hidden cursor-pointer w-full`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`${card.id === "balance" ? "text-white/80" : "text-[#64748B]"} text-xs font-semibold uppercase tracking-widest`}>{card.label}</span>
                  {card.icon}
                </div>
                <div className={`text-2xl font-black ${card.id === "balance" ? "text-white" : "text-[#0F172A]"} tabular-nums tracking-tight`}>{card.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${card.id === "balance" ? "text-white/60" : "text-[#64748B]"} truncate`}>{card.sub}</span>
                  <MiniSparkline />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs max-w-[200px]">{card.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
