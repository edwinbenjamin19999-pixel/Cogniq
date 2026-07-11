import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Issue {
  text: string;
  href?: string;
}

interface Props {
  issues?: Issue[];
  actionHref?: string;
  actionLabel?: string;
}

/**
 * Compact single-line AI alert bar.
 * Replaces the large DailyAIBriefing card on the dashboard for higher density.
 */
export function CompactAIAlertBar({
  issues = [
    { text: "1 post kräver granskning", href: "/bookkeep" },
    { text: "2 fakturor förfallna", href: "/invoices" },
    { text: "Kassaflödet volatilt", href: "/cashflow-forecast" },
  ],
  actionHref = "/ai-ekonom",
  actionLabel = "Åtgärda",
}: Props) {
  const navigate = useNavigate();

  if (!issues.length) return null;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 flex items-center gap-3 mb-5">
      <Sparkles className="w-4 h-4 text-[#0052FF] shrink-0" />
      <div className="text-[#64748B] text-sm flex-1 min-w-0 truncate">
        {issues.map((i, idx) => (
          <span key={idx}>
            {idx > 0 && <span className="text-[#94A3B8] mx-2">·</span>}
            {i.text}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => navigate(actionHref)}
        className="text-[#0052FF] text-sm font-medium hover:text-[#0052FF]/80 inline-flex items-center gap-1 shrink-0"
      >
        {actionLabel} <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
