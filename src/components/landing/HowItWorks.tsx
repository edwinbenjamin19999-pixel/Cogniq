import { Landmark, Cpu, ShieldCheck } from "lucide-react";

type Step = {
  n: string;
  Icon: typeof Landmark;
  title: string;
  body: string;
  example?: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    Icon: Landmark,
    title: "Koppla ditt bankkonto",
    body: "Direktintegration mot din bank via Open Banking. Transaktioner hämtas automatiskt i realtid — inga manuella importer.",
  },
  {
    n: "2",
    Icon: Cpu,
    title: "AI konterar automatiskt",
    body: "Varje transaktion klassificeras mot rätt konto i BAS-kontoplanen. Moms beräknas per rad. Precision över 94% direkt ur lådan.",
    example: "Telia AB → Konto 6110 · Telefon & datakommunikation · 25% moms",
  },
  {
    n: "3",
    Icon: ShieldCheck,
    title: "Du granskar — klart",
    body: "Granska AI:ns arbete på sekunder. Godkänn, justera eller flagga. Allt låses med revisionsspår. Din bokföring är alltid redo för deklaration.",
  },
];

/**
 * FLAT PROCESS-BLOCK — grå-100-sektion med vita kortblock.
 * Stegnumret är en solid blå cirkel (färg som struktur), ikoner i
 * tintade brickor. Hover = skala, aldrig skugga.
 */
export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gray-100 py-24 px-6 scroll-mt-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#000000]">
          Så här fungerar det
        </p>
        <h2 className="mb-4 text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[#000000]">
          Bokföring som sköter sig själv.
        </h2>
        <p className="mb-16 text-center text-base text-[#000000]/60">
          Tre steg. Inga förkunskaper. Alltid korrekt.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map(({ n, Icon, title, body, example }) => (
            <div
              key={n}
              className="relative rounded-lg bg-white p-8 transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="absolute -top-4 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-[#000000] text-sm font-bold text-white">
                {n}
              </div>
              <div className="mb-5 mt-2 flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 text-[#000000]">
                <Icon className="h-6 w-6" strokeWidth={2.5} aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#000000]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#000000]/60">{body}</p>
              {example && (
                <div className="mt-4 rounded-md bg-[#000000] p-3 font-mono text-[11px] text-neutral-300">
                  {example}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs font-medium text-[#000000]/50">
          Genomsnittlig tid för att bokföra en transaktion med Bokfy: under 3 sekunder.
        </p>
      </div>
    </section>
  );
};
