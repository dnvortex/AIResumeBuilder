import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { TemplateSelector } from "@/components/builder/template-selector";
import { ResumeJobMatcher } from "@/components/builder/resume-job-matcher";
import { ResumeEditor } from "@/components/builder/resume-editor";
import { ResumePreview } from "@/components/resume-preview/resume-preview";
import { SkillsSuggestions } from "@/components/resume-tools/skills-suggestions";
import { AchievementEnhancer } from "@/components/resume-tools/achievement-enhancer";
import { PricingSection } from "@/components/marketing/pricing-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Builder Interface */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            <TemplateSelector />
            <ResumeJobMatcher />
            <ResumeEditor />
          </div>
          
          {/* Right Column: Live Preview & Tools */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            <ResumePreview />
            <SkillsSuggestions />
            <AchievementEnhancer />
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="mt-16">
          <PricingSection />
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}
