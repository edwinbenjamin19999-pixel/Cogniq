import { LucideIcon } from "lucide-react";
import { GradientKPIStrip, GradientKPICardData } from "@/components/shared/GradientKPICard";

interface SummaryCard { label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color: string;
  alert?: boolean;
  gradient?: string;
}

const COLOR_TO_GRADIENT: Record<string, string> = { "text-muted-foreground": "bg-white border border-[#E2E8F0]",
  "text-[#1D9E75]": "bg-white border border-[#E2E8F0]",
  "text-[#085041]": "bg-white border border-[#E2E8F0]",
  "text-primary": "bg-white border border-[#E2E8F0]",
  "text-destructive": "bg-white border border-[#E2E8F0]",
  "text-blue-500": "bg-white border border-[#E2E8F0]",
  "text-[#7A5417]": "bg-white border border-[#E2E8F0]",
  "text-secondary": "bg-white border border-[#E2E8F0]",
};

export const SummaryCards = ({ cards }: { cards: SummaryCard[] }) => { const gradientCards: GradientKPICardData[] = cards.map((card) => ({ label: card.label,
    value: card.value,
    sub: card.sub,
    icon: card.icon,
    gradient: card.gradient || COLOR_TO_GRADIENT[card.color] || "bg-white border border-[#E2E8F0]",
  }));

  return <GradientKPIStrip cards={gradientCards} />;
};
