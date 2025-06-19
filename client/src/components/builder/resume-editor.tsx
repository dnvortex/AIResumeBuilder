import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ResumeSectionTabs, TabType } from "./resume-section-tabs";
import { PersonalInfoForm } from "./section-forms/personal-info-form";
import { ExperienceForm } from "./section-forms/experience-form";
import { EducationForm } from "./section-forms/education-form";
import { SkillsForm } from "./section-forms/skills-form";
import { Undo2, Redo2 } from "lucide-react";
import { useResume } from "@/hooks/use-resume";

export function ResumeEditor() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const { resumeState, resetResumeHistory, canUndo, canRedo, undo, redo } = useResume();
  
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };
  
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-accent font-semibold">Resume Builder</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="text-xs bg-dark-900 hover:bg-dark-800 text-gray-300 py-1 px-3 h-auto"
            onClick={undo}
            disabled={!canUndo}
          >
            <Undo2 className="h-3 w-3 mr-1" />
            Undo
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="text-xs bg-dark-900 hover:bg-dark-800 text-gray-300 py-1 px-3 h-auto"
            onClick={redo}
            disabled={!canRedo}
          >
            <Redo2 className="h-3 w-3 mr-1" />
            Redo
          </Button>
        </div>
      </div>
      
      <ResumeSectionTabs activeTab={activeTab} onChange={setActiveTab} />
      
      {renderActiveTabContent()}
    </GlassCard>
  );
}
