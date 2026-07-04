/**
 * Execution-level classification for AI Ekonom actions.
 * AUTO     — safe to fire immediately (still previewed)
 * ASSISTED — requires user approval
 * MANUAL   — high-stakes; user drives entirely
 */
import type { CFOActionType } from "@/hooks/useCFOPriorities";

export type ExecutionLevel = "AUTO" | "ASSISTED" | "MANUAL";

const AUTO_SAFE_ACTIONS: CFOActionType[] = ["send_reminder", "reclassify", "generate_report"];

export function executionLevel(
  action_type: CFOActionType,
  confidence: number,
  impact_sek: number,
): ExecutionLevel {
  const impact = Math.abs(impact_sek || 0);
  if (action_type === "none") return "MANUAL";
  if (confidence >= 0.85 && impact < 25_000 && AUTO_SAFE_ACTIONS.includes(action_type)) {
    return "AUTO";
  }
  if (confidence >= 0.6 && impact < 250_000) return "ASSISTED";
  return "MANUAL";
}

export const LEVEL_META: Record<ExecutionLevel, { label: string; tone: string; ring: string; desc: string }> = {
  AUTO:     { label: "AUTO",     tone: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#E1F5EE] border-neutral-300 dark:border-[#BFE6D6]", ring: "ring-neutral-300/40", desc: "Säker att utföras automatiskt" },
  ASSISTED: { label: "ASSISTERAD", tone: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#FAEEDA] border-neutral-300 dark:border-[#F0DDB7]", ring: "ring-neutral-300/40", desc: "Granska och godkänn först" },
  MANUAL:   { label: "MANUELL",  tone: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#FCE8E8] border-neutral-300 dark:border-[#F4C8C8]", ring: "ring-neutral-300/40", desc: "Kräver fullt manuellt beslut" },
};

export function confidenceTone(c: number): { label: string; cls: string } {
  if (c >= 0.85) return { label: "Hög", cls: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#E1F5EE] border-neutral-300 dark:border-[#BFE6D6]" };
  if (c >= 0.6)  return { label: "Medel", cls: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#FAEEDA] border-neutral-300 dark:border-[#F0DDB7]" };
  return { label: "Låg", cls: "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#FCE8E8] border-neutral-300 dark:border-[#F4C8C8]" };
}
