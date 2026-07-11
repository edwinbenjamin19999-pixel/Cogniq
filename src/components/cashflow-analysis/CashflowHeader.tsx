import { Sparkles } from "lucide-react";

export function CashflowHeader() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#0052FF] dark:text-[#0052FF] ring-1 ring-[#0052FF]/20">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Kassaflödesanalys
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-driven analys av likviditet, in- och utflöden samt kassadrivare.
        </p>
      </div>
    </div>
  );
}
