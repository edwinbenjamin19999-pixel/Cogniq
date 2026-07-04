import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  { id: "ai-bokforing", label: "AI & bokföring", tint: "bg-neutral-100", text: "text-black" },
  { id: "moms", label: "Moms", tint: "bg-neutral-100", text: "text-neutral-700" },
  { id: "guider", label: "Guider", tint: "bg-neutral-100", text: "text-black" },
  { id: "tillvaxt", label: "Tillväxt", tint: "bg-neutral-100", text: "text-neutral-700" },
  { id: "byra-wl", label: "Byrå & White Label", tint: "bg-purple-50", text: "text-purple-700" },
  { id: "produktnyheter", label: "Produktnyheter", tint: "bg-slate-100", text: "text-slate-700" },
];

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
