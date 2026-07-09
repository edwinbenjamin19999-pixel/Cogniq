import { Clock, Sparkles, ListChecks } from "lucide-react";

/**
 * "EN PLATTFORM · ALLA ROLLER" — tre kort som visar plattformen ur
 * arbetsflödets vinkel snarare än funktionslistan (kompletterar Pillars).
 */
const CARDS = [
  {
    icon: Clock,
    title: "Realtidsbokföring",
    desc: "Transaktioner kategoriseras och stäms av mot kontoutdrag dygnet runt — utan att du lyfter ett finger.",
  },
  {
    icon: Sparkles,
    title: "Fråga Cogniq",
    desc: "Din alltid-på analytiker. Ställ komplexa skatte- och redovisningsfrågor och få källhänvisade svar på sekunder.",
  },
  {
    icon: ListChecks,
    title: "Agentiskt bokslut",
    desc: "Underlag samlas in, avvikelser flaggas och checklistor drivs framåt automatiskt inför månadsstängning.",
  },
];

export const TeamWorkflowSection = () => {
  return (
    <section className="bg-[#F5F8FF] py-24 px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0052FF]">
            En plattform · alla roller
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-4xl">
            Byggt för hur ekonomiteam faktiskt jobbar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0F172A]/60">
            Från löpande bokföring till bokslut och rådgivning — samma
            verktyg, oavsett roll eller arbetssätt.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EAF0FF] text-[#0052FF] transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#0F172A]/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
