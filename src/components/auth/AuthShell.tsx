import { ReactNode } from "react";
import { Check } from "lucide-react";
import hero3d from "@/assets/hero-3d.png";

interface AuthShellProps {
  children: ReactNode;
  /** Compact left panel — used in onboarding to give more breathing room to the form */
  compact?: boolean;
}

const FEATURES = [
  "AI tolkar kvitton och fakturor automatiskt",
  "Momsdeklaration & AGI med ett klick",
  "Bankintegration med alla storbanker",
];

const STATS = [
  { value: "99.9%", label: "Drifttid" },
  { value: "BAS 2026", label: "Kontoplan" },
  { value: "GDPR", label: "Certifierat" },
];

/**
 * FLAT AUTH-SHELL — split-screen som speglar landningssidans poster-hero.
 * VÄNSTER: solitt blue-600-block med geometrisk dekoration (inga glows,
 * mönster eller gradienter). Amber marker-highlight på "Automatiserad."
 * HÖGER: vit minimal yta för formulär.
 */
export const AuthShell = ({ children, compact = false }: AuthShellProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* LEFT — flat blått poster-block, dolt på mobil */}
      <div className="hidden lg:flex flex-1 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        {/* Ambient dekoration — dot-mönster, glows och svävande 3D-glasloop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.04 }} />
          <div className="absolute -top-32 -right-24 h-[440px] w-[440px] rounded-full bg-[#0052FF] opacity-30 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-[#4D7CFF] opacity-20 blur-[120px]" />
          {/* Higgsfield 3D-glasloop — roterar långsamt uppe till höger */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={hero3d}
            className="auth-3d-float absolute -right-16 top-[18%] w-[380px] opacity-70 mix-blend-screen"
            style={{ maskImage: "radial-gradient(circle at 50% 50%, #000 46%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 46%, transparent 72%)" }}
          >
            <source src="/hero-3d.mp4" type="video/mp4" />
          </video>
        </div>
        <style>{`
          @keyframes auth3dFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
          .auth-3d-float { animation: auth3dFloat 7s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .auth-3d-float { animation: none; } }
        `}</style>

        <div className="relative z-10">
          <span className="text-2xl font-extrabold tracking-tight text-white">Cog</span>
          <span className="text-2xl font-extrabold tracking-tight text-[#4D7CFF]">niq</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2
            className={`${compact ? "text-[36px]" : "text-[44px]"} font-extrabold text-white leading-[1.15] tracking-tight`}
          >
            Bokföring.
            <br />
            <span className="text-[#4D7CFF]">Automatiserad.</span>
          </h2>

          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-md bg-white">
                  <Check className="h-3.5 w-3.5 text-[#0052FF]" strokeWidth={3} aria-hidden />
                </div>
                <span className="text-sm font-medium text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex gap-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-[22px] font-extrabold text-white">{s.value}</div>
              <div className="mt-0.5 text-[11.5px] uppercase tracking-wider text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — minimal form slot */}
      <div className="w-full lg:w-1/2 xl:w-[560px] flex-shrink-0 bg-white flex items-center justify-center px-6 sm:px-8 py-12 min-h-screen">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile-only logo */}
          <div className="flex lg:hidden items-center gap-0 mb-8">
            <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">Cog</span>
            <span className="text-xl font-extrabold tracking-tight text-[#0052FF]">niq</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
