import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useResume } from "@/hooks/use-resume";

export function SkillsSuggestions() {
  const { toast } = useToast();
  const { resumeState, addSkill } = useResume();
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchSuggestedSkills = async () => {
    if (!resumeState.personalInfo.jobTitle) {
      toast({
        title: "Job title required",
        description: "Please fill in your job title first to get relevant skill suggestions",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/resume/suggest-skills", {
        jobTitle: resumeState.personalInfo.jobTitle,
        currentSkills: resumeState.skills
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestedSkills(data.suggestedSkills || []);
      }
    } catch (error) {
      toast({
        title: "Failed to get suggestions",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (resumeState.personalInfo.jobTitle && resumeState.skills.length === 0) {
      fetchSuggestedSkills();
    }
  }, [resumeState.personalInfo.jobTitle]);
  
  const handleAddSkill = (skill: string) => {
    // Check if skill already exists in resume
    if (resumeState.skills.includes(skill)) {
      toast({
        title: "Skill already added",
        description: `"${skill}" is already in your resume`,
      });
      return;
    }
    
    addSkill(skill);
    
    // Remove from suggested skills
    setSuggestedSkills(prev => prev.filter(s => s !== skill));
    
    toast({
      title: "Skill added",
      description: `"${skill}" added to your resume`,
    });
  };
  
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-primary-500" />
        <h2 className="text-xl font-accent font-semibold">AI Skills Suggestions</h2>
      </div>
      
      <div className="bg-dark-900/70 rounded-lg p-4">
        <p className="text-sm text-gray-300 mb-4">
          Based on your role as a <span className="text-primary-400 font-medium">{resumeState.personalInfo.jobTitle || "Professional"}</span> and the latest industry trends, consider adding these skills to stand out:
        </p>
        
        {suggestedSkills.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {suggestedSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full bg-primary-600/20 border border-primary-600/50 flex items-center justify-center cursor-pointer hover:bg-primary-600/30"
                    onClick={() => handleAddSkill(skill)}
                  >
                    <Plus className="h-3 w-3 text-primary-500" />
                  </div>
                  <span className="text-sm text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
            
            <Button 
              variant="link" 
              className="w-full text-center text-sm text-primary-400 hover:text-primary-300 transition mt-2"
              onClick={fetchSuggestedSkills}
              disabled={isLoading}
            >
              Generate more suggestions
            </Button>
          </>
        ) : (
          <div className="py-4 text-center">
            {isLoading ? (
              <p className="text-sm text-gray-400">Generating skill suggestions...</p>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-3">No skill suggestions available yet.</p>
                <Button 
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={fetchSuggestedSkills}
                  disabled={!resumeState.personalInfo.jobTitle}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Generate Suggestions
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
