import { lazy, Suspense, ReactNode } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/landing/Hero";
import { Pillars } from "@/components/landing/Pillars";

import { HowItWorks } from "@/components/landing/HowItWorks";
import { SelectedFeatures } from "@/components/landing/SelectedFeatures";
import { InteractiveDemoPreview } from "@/components/landing/InteractiveDemoPreview";
import { AutomationGrid } from "@/components/landing/AutomationGrid";
import { WhyNorthLedger } from "@/components/landing/WhyNorthLedger";
import { UseCases } from "@/components/landing/UseCases";
import { PilotCTA } from "@/components/landing/PilotCTA";

import { TrustCompliance } from "@/components/landing/TrustCompliance";
import { WhiteLabelSection } from "@/components/landing/WhiteLabelSection";
import { CountdownCTA } from "@/components/landing/CountdownCTA";
import { FAQ } from "@/components/landing/FAQ";


const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

/**
 * FLAT POSTER LAYOUT — sidan komponeras som en serie solida färgblock:
 * blå (hero) → navy → vit → navy → amber → navy → vit → navy (footer).
 * Sektioner byggda för mörk bakgrund (vit text) ligger i navy-block tills
 * de konverteras; färgövergångarna är skarpa, aldrig tonade.
 */
const NavyBlock = ({ children }: { children: ReactNode }) => (
  <div className="bg-[#0F1B2D]">{children}</div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <NavyBlock>
          <CountdownCTA />
          <InteractiveDemoPreview />
        </NavyBlock>
        <Pillars />
        <NavyBlock>
          <HowItWorks />
          <AutomationGrid />
          <WhyNorthLedger />
          <UseCases />
        </NavyBlock>
        <PilotCTA />
        <NavyBlock>
          <SelectedFeatures />
          <TrustCompliance />
          <WhiteLabelSection />
        </NavyBlock>
        <FAQ />
      </main>
      <Suspense fallback={null}>
        <NavyBlock>
          <Footer />
        </NavyBlock>
      </Suspense>
    </div>
  );
};

export default Index;
