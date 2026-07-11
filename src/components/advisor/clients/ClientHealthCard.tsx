import { Sparkles } from "lucide-react";

export type HealthStatus = "ok" | "warning" | "critical";

export interface HealthIndicator {
  label: string;
  status: HealthStatus;
  detail: string;
}

export interface RiskSignal {
  level: "warning" | "critical";
  message: string;
}

interface Props {
  riskScore: number; // 0-100
  indicators: HealthIndicator[];
  signals: RiskSignal[];
  lastScanAt?: string;
}

const dotColor = (s: HealthStatus) =>
  s === "ok" ? "bg-emerald-400" : s === "warning" ? "bg-amber-400" : "bg-red-500";

const riskBucket = (score: number) => {
  if (score >= 70) return { label: "Kritisk", text: "text-[#E24B4A]", bg: "bg-[#FCE8E8]" };
  if (score >= 40) return { label: "Varning", text: "text-[#EF9F27]", bg: "bg-[#FEF3E2]" };
  return { label: "Säker", text: "text-[#1D9E75]", bg: "bg-[#E1F5EE]" };
};

export const ClientHealthCard = ({ riskScore, indicators, signals, lastScanAt }: Props) => {
  const bucket = riskBucket(riskScore);
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-[14px] text-[#0F172A]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-medium tracking-wide text-[#0F172A]">KLIENTHÄLSA</h3>
        <div className={`px-2 py-1 rounded-md ${bucket.bg} ${bucket.text} text-[11px] font-semibold flex items-baseline gap-1`}>
          <span className="text-[16px]">{riskScore}</span>
          <span>{bucket.label}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {indicators.map((ind) => (
          <div key={ind.label} className="flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className={`h-[7px] w-[7px] rounded-full ${dotColor(ind.status)}`} />
              <span className="text-[#475569]">{ind.label}</span>
            </div>
            <span
              className={
                ind.status === "ok"
                  ? "text-emerald-600"
                  : ind.status === "warning"
                  ? "text-amber-600"
                  : "text-red-500"
              }
            >
              {ind.detail}
            </span>
          </div>
        ))}
      </div>

      {signals.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-1.5 mb-2 text-[10px] text-purple-600 uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            AI-signaler
          </div>
          <ul className="space-y-1.5">
            {signals.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-[#475569]">
                <span
                  className={`mt-1.5 h-[6px] w-[6px] rounded-full shrink-0 ${
                    s.level === "critical" ? "bg-red-500" : "bg-amber-400"
                  }`}
                />
                <span>{s.message}</span>
              </li>
            ))}
          </ul>
          {lastScanAt && (
            <p className="mt-2 text-[10px] text-[#94A3B8]">Senaste AI-scan: {lastScanAt}</p>
          )}
        </div>
      )}
    </div>
  );
};
