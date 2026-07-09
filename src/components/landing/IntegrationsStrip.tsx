/**
 * INTEGRATIONSRAD — vit remsa direkt under hero. Top-padding kompenserar
 * heros svävande produktskärm (-mb-28/-32 i Hero.tsx) så skärmen får
 * plats att "landa" innan remsans text börjar.
 */
const INTEGRATIONS = ["Fortnox", "Visma", "Bokio", "Monitor ERP", "Briox"];

export const IntegrationsStrip = () => {
  return (
    <section className="border-b border-t border-border bg-white pb-10 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          Integreras direkt med
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-11 gap-y-3">
          {INTEGRATIONS.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-semibold tracking-[-0.01em] text-[#0F172A]/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
