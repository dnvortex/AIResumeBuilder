import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AISuggestion } from "@/components/ui/ai-suggestion";
import { useResume } from "@/hooks/use-resume";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function PersonalInfoForm() {
  const { toast } = useToast();
  const { resumeState, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeState;
  
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [enhancedSummary, setEnhancedSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updatePersonalInfo({ ...personalInfo, [field]: value });
  };
  
  const generateSuggestionsForSummary = async () => {
    if (!personalInfo.summary) {
      toast({
        title: "Summary required",
        description: "Please provide a summary to get AI suggestions",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await apiRequest("POST", "/api/resume/enhance-summary", {
        summary: personalInfo.summary,
        jobTitle: personalInfo.jobTitle
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestion(data.suggestion);
        setEnhancedSummary(data.enhancedSummary);
      }
    } catch (error) {
      toast({
        title: "Failed to generate suggestions",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const applySuggestion = () => {
    if (enhancedSummary) {
      updatePersonalInfo({ ...personalInfo, summary: enhancedSummary });
      setSuggestion(null);
      setEnhancedSummary(null);
    }
  };
  
  const dismissSuggestion = () => {
    setSuggestion(null);
    setEnhancedSummary(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Full Name</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Job Title</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={personalInfo.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-300 mb-1">Email</Label>
        <Input 
          type="email"
          className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          value={personalInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Phone</Label>
          <Input 
            type="tel" 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Location</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-300 mb-1">Professional Summary</Label>
        <div className="relative">
          <Textarea 
            className="w-full h-24 bg-dark-900/70 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            value={personalInfo.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-2 right-2 text-primary-500 hover:text-primary-400 bg-dark-900/80 rounded-md p-1"
            onClick={generateSuggestionsForSummary}
            disabled={isGenerating}
          >
            <Zap className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {suggestion && (
        <AISuggestion 
          suggestion={suggestion}
          onApply={applySuggestion}
          onDismiss={dismissSuggestion}
        />
      )}
    </div>
  );
}
