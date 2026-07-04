import { Sparkles } from "lucide-react";

const PROMPTS = [
  "Hur går det jämfört med förra månaden?",
  "Vilka kunder ska jag följa upp?",
  "Förbered månadens momsdeklaration",
  "Visa mig avvikelser från senaste veckan",
];

interface Props {
  onPick: (q: string) => void;
  hasBank: boolean;
  onConnectBank?: () => void;
  onUploadSie?: () => void;
}

export function WelcomeState({ onPick, hasBank, onConnectBank, onUploadSie }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto w-full">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "linear-gradient(135deg, #000000, #525252)",
          boxShadow: "0 10px 30px -10px rgba(59,130,246,0.5)",
        }}
      >
        <Sparkles className="w-7 h-7 text-white" />
      </div>

      <h2 className="text-[24px] font-semibold tracking-tight text-foreground mb-2">
        Vad vill du veta om din ekonomi idag?
      </h2>
      <p className="text-[14px] text-muted-foreground mb-6 max-w-md leading-relaxed">
        {hasBank
          ? "Ställ en fråga om dina siffror, be mig förbereda en deklaration, eller låt mig agera direkt."
          : "Jag kan svara på allmänna frågor om bokföring, men för att analysera din ekonomi behöver jag tillgång till dina transaktioner."}
      </p>

      {!hasBank && (
        <div className="w-full mb-6 rounded-xl border border-border bg-card p-4 flex items-center justify-center gap-2">
          <button
            onClick={onConnectBank}
            className="h-9 px-3 rounded-lg bg-[#000000] text-white text-[13px] font-medium hover:bg-[#000000] transition"
          >
            Anslut bank
          </button>
          <button
            onClick={onUploadSie}
            className="h-9 px-3 rounded-lg border border-border text-[13px] font-medium text-foreground hover:bg-muted transition"
          >
            Ladda upp SIE-fil
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        {PROMPTS.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className="text-left px-4 py-3 rounded-xl border border-border bg-card text-[13px] text-foreground hover:border-[#000000]/50 hover:bg-[#000000]/5 transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
