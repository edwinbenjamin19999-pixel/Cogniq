import { ArrowRight } from "lucide-react";
import type { NextActionsPayload } from "@/lib/ai-ekonom/intentRouter";

interface Props {
  data: NextActionsPayload;
  onPick: (query: string) => void;
}

export const NextActionsBlock = ({ data, onPick }: Props) => (
  <div>
    <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold mb-2">Förslag på nästa steg</p>
    <div className="flex flex-wrap gap-2">
      {data.actions.map((a, i) => (
        <button
          key={i}
          onClick={() => onPick(a.query)}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0052FF] hover:bg-blue-50/60 hover:text-[#0052FF] text-slate-700 transition-colors"
        >
          {a.label}
          <ArrowRight className="w-3 h-3" />
        </button>
      ))}
    </div>
  </div>
);
