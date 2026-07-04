import { CheckCircle2, X, Sparkles } from "lucide-react";
import type { SolutionComparison as SolutionComparisonData } from "@/data/guides/articles/types";

export const SolutionComparison = ({ data }: { data: SolutionComparisonData }) => (
  <section className="relative my-16 -mx-2 md:-mx-6 rounded-[28px] bg-gradient-to-br from-[#000000] via-[#101a3a] to-[#000000] p-8 md:p-10 overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#000000]/40 to-transparent" />

    <div className="flex items-center gap-2.5">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#000000]/15 border border-[#000000]/20">
        <Sparkles className="h-4 w-4 text-[#000000]" />
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#000000]">Automation</span>
    </div>
    <h2 className="!mt-4 !text-[28px] md:!text-[32px] font-semibold tracking-tight !text-white !mb-4">
      Hur Bokfy automatiserar detta
    </h2>
    <p className="text-white/70 leading-[1.75] max-w-2xl !mb-0">{data.intro}</p>

    <div className="mt-8 grid md:grid-cols-2 gap-4">
      {/* Manuellt */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] font-semibold text-white/60">
          Manuellt
        </div>
        <ul className="mt-4 space-y-3">
          {data.comparison.map((row, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] text-white/60 leading-relaxed">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <span>{row.manual}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Med Bokfy */}
      <div className="relative rounded-2xl border border-[#000000]/20 bg-[#000000]/[0.08] p-5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-[#000000]/40" />
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#000000]/15 border border-[#000000]/30 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#000000] shadow-[0_0_20px_-4px_rgba(0,0,0,0.4)]">
          Med Bokfy
        </div>
        <ul className="mt-4 space-y-3">
          {data.comparison.map((row, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] text-white font-medium leading-relaxed">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#000000]" />
              <span>{row.northledger}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
