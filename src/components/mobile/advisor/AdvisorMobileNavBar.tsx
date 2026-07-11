import { Home, Users, ListChecks, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

export type AdvisorTab = "home" | "clients" | "tasks" | "approvals" | "ai";

const tabs: { id: AdvisorTab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Hem", icon: Home },
  { id: "clients", label: "Klienter", icon: Users },
  { id: "tasks", label: "Uppgifter", icon: ListChecks },
  { id: "approvals", label: "Godkänn", icon: CheckCircle },
  { id: "ai", label: "AI", icon: Sparkles },
];

interface AdvisorMobileNavBarProps {
  active: AdvisorTab;
  onChange: (tab: AdvisorTab) => void;
}

export const AdvisorMobileNavBar = ({ active, onChange }: AdvisorMobileNavBarProps) => (
  <nav
    className="fixed bottom-0 left-0 right-0 z-40 px-3"
    style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
  >
    <div
      className={cn(
        "mx-auto max-w-md grid grid-cols-5 h-[64px]",
        "bg-white/90 backdrop-blur-2xl border border-[#E2E8F0] rounded-2xl",
        "shadow-[0_8px_24px_-8px_rgba(15,23,42,0.15)]",
      )}
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        const isAI = t.id === "ai";
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => { haptic("light"); onChange(t.id); }}
            className={cn(
              "relative flex flex-col items-center justify-center gap-0.5 min-h-[44px] active:scale-90 transition-all duration-150",
              isActive ? "text-[#0052FF]" : "text-[#64748B]",
            )}
          >
            {isActive && (
              <span className={cn(
                "absolute top-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#0052FF]",
                "shadow-[0_0_8px_rgba(0,82,255,0.7)]",
              )} />
            )}
            <div className={cn(
              "rounded-xl p-1 transition-all",
              isActive && "scale-110",
              isActive && isAI && "shadow-[0_0_14px_rgba(0,82,255,0.5)]",
            )}>
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.75} />
            </div>
            <span className={cn(
              "text-[10px] leading-none",
              isActive ? "font-bold" : "font-medium",
            )}>{t.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
