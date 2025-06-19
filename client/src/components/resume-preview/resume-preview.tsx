import { useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ResumePaper } from "@/components/ui/resume-paper";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { Download } from "lucide-react";
import { useResume } from "@/hooks/use-resume";
import { generatePDF } from "@/lib/pdf-generator";
import { useToast } from "@/hooks/use-toast";

export function ResumePreview() {
  const { toast } = useToast();
  const { resumeState } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      await generatePDF(resumeRef.current, resumeState.personalInfo.fullName || "resume");
      toast({
        title: "Resume downloaded",
        description: "Your resume has been downloaded as a PDF",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download resume",
        variant: "destructive"
      });
    }
  };
  
  const renderTemplate = () => {
    switch (resumeState.templateId) {
      case "modern":
        return <ModernTemplate resume={resumeState} />;
      case "professional":
        return <ProfessionalTemplate resume={resumeState} />;
      case "creative":
        return <CreativeTemplate resume={resumeState} />;
      default:
        return <ModernTemplate resume={resumeState} />;
    }
  };
  
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-accent font-semibold">Live Preview</h2>
        <div className="flex gap-2">
          <Button
            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-3 overflow-hidden">
        <div ref={resumeRef} className="h-[30rem] overflow-y-auto">
          <ResumePaper>{renderTemplate()}</ResumePaper>
        </div>
      </div>
    </GlassCard>
  );
}
