import { Check, Sparkles } from "lucide-react";

/**
 * "GRANSKAR SIG SJÄLV" — split-sektion som fördjupar hero-löftet.
 * Vänster: tre konkreta kontroll-punkter. Höger: en verklig avvikelse
 * — flaggad, källhänvisad till verifikat/konto, med två tydliga åtgärder.
 */
const CHECKS = [
  {
    title: "Djupanalys ner på verifikatsnivå.",
    body: "Varje avvikelse länkar till verifikat, konto och lagrum.",
  },
  {
    title: "Lär sig ditt kontoplan.",
    body: "Inga regler att underhålla — modellen anpassar sig.",
  },
  {
    title: "Källhänvisat, alltid.",
    body: "Kontrollera svaret själv, ner till paragraf.",
  },
];

export const AnomalyControlSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
        {/* Vänster: budskap */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0052FF]">
            Kontroll utan handpåläggning
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-4xl">
            Ta kontroll genom att släppa kontrollen.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#0F172A]/60">
            Cogniq analyserar bokföringen med förståelse för hur just din
            bransch fungerar — och flaggar bara det som faktiskt avviker. Du
            bestämmer själv vilka kontroller som gäller.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {CHECKS.map((c) => (
              <div key={c.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#0052FF]">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                </div>
                <span className="text-[14.5px] leading-relaxed text-[#0F172A]">
                  <b className="font-semibold">{c.title}</b>{" "}
                  <span className="text-[#0F172A]/60">{c.body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Höger: avvikelsekort */}
        <div className="rounded-2xl border border-border bg-white p-2 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.28)]">
          <div className="flex items-center gap-2.5 px-3.5 pb-3.5 pt-3">
            <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-[#EAF0FF] text-[#0052FF]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <div className="text-[13px] font-semibold text-[#0F172A]">Avvikelse upptäckt</div>
              <div className="mt-0.5 text-[11.5px] text-[#0F172A]/45">Fordringar · konto 1510</div>
            </div>
          </div>

          <div className="mx-1.5 mb-1.5 rounded-xl border border-border bg-[#FAFBFD] p-4">
            <span className="mb-2.5 inline-block rounded-full bg-red-50 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.09em] text-red-600">
              Kräver åtgärd
            </span>
            <p className="text-[13px] leading-relaxed text-[#0F172A]">
              Fordringar som normalt innebär inflöde av likvida medel har
              konterats bort — men inga likvida medel har registrerats.
            </p>
            <div className="mt-3.5 flex gap-6 border-t border-slate-200 pt-3">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#0F172A]/40">Verifikat</div>
                <div className="mt-1 font-mono text-xs text-[#0F172A]">B9 · B18 · B57</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#0F172A]/40">Konto</div>
                <div className="mt-1 font-mono text-xs text-[#0F172A]">1510 Kundfordringar</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#0F172A]/40">Belopp</div>
                <div className="mt-1 font-mono text-xs text-red-600">−48 200</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-1.5 pb-1.5 pt-3">
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#0052FF] py-2.5 text-center text-[12.5px] font-semibold text-white transition-colors hover:bg-[#0040CC]"
            >
              Markera som löst
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-slate-100 py-2.5 text-center text-[12.5px] font-medium text-[#0F172A]/70 transition-colors hover:bg-slate-200"
            >
              Ej ett problem
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
