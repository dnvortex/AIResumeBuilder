import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useResume } from "@/hooks/use-resume";

export function AchievementEnhancer() {
  const { toast } = useToast();
  const { resumeState } = useResume();
  const [responsibility, setResponsibility] = useState("");
  const [enhancedAchievements, setEnhancedAchievements] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const handleEnhance = async () => {
    if (!responsibility.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a job responsibility to enhance",
        variant: "destructive"
      });
      return;
    }
    
    setIsEnhancing(true);
    
    try {
      const response = await apiRequest("POST", "/api/resume/enhance-achievement", {
        responsibility,
        jobTitle: resumeState.personalInfo.jobTitle
      });
      
      if (response.ok) {
        const data = await response.json();
        setEnhancedAchievements(data.enhancedAchievements || []);
      }
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: error instanceof Error ? error.message : "Failed to enhance achievement",
        variant: "destructive"
      });
    } finally {
      setIsEnhancing(false);
    }
  };
  
  const handleSelectAchievement = (achievement: string) => {
    // Copy to clipboard
    navigator.clipboard.writeText(achievement);
    
    toast({
      title: "Copied to clipboard",
      description: "Achievement copied to clipboard. Paste it in your experience description.",
    });
  };
  
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary-500" />
        <h2 className="text-xl font-accent font-semibold">Achievement Enhancer</h2>
      </div>
      
      <div className="bg-dark-900/70 rounded-lg p-4">
        <p className="text-sm text-gray-300 mb-3">Transform basic job duties into powerful achievement statements with specific metrics and outcomes.</p>
        
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-300 mb-1">Enter a job responsibility:</Label>
          <Textarea 
            className="w-full h-16 bg-dark-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none" 
            placeholder="Example: Designed user interfaces for mobile applications"
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
          />
        </div>
        
        <Button 
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition w-full flex items-center justify-center gap-2 mb-4"
          onClick={handleEnhance}
          disabled={isEnhancing || !responsibility.trim()}
        >
          <Zap className="h-4 w-4" />
          Enhance with AI
        </Button>
        
        {enhancedAchievements.length > 0 && (
          <div className="bg-primary-900/20 border border-primary-800 rounded-lg p-3 fade-in-up">
            <h3 className="text-sm font-medium text-primary-300 mb-2">Enhanced Achievements:</h3>
            
            <div className="space-y-2">
              {enhancedAchievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="p-2 bg-dark-900/80 rounded border border-gray-700 hover:border-primary-700 cursor-pointer transition"
                  onClick={() => handleSelectAchievement(achievement)}
                >
                  <p className="text-sm text-gray-200">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
