import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/hooks/use-resume";
import { apiRequest } from "@/lib/queryClient";

export function ResumeJobMatcher() {
  const { toast } = useToast();
  const { resumeState } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to optimize your resume.",
        variant: "destructive"
      });
      return;
    }
    
    setIsOptimizing(true);
    
    try {
      const response = await apiRequest("POST", "/api/resume/match-job", {
        resumeId: resumeState.id,
        jobDescription
      });
      
      if (response.ok) {
        toast({
          title: "Resume optimized",
          description: "Your resume has been optimized for the job description.",
        });
      }
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: error instanceof Error ? error.message : "Failed to optimize resume",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-primary-600/10 text-primary-300 text-xs font-medium py-1 px-3 rounded-bl-lg">
        AI Powered
      </div>
      <h2 className="text-xl font-accent font-semibold mb-4">Job Matching</h2>
      <p className="text-sm text-gray-300 mb-4">Paste a job description to optimize your resume for this specific role.</p>
      
      <Textarea
        className="w-full h-24 bg-dark-900/70 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-400">AI will match your skills to job requirements</div>
        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing || !jobDescription.trim()}
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Optimize
        </Button>
      </div>
    </GlassCard>
  );
}
