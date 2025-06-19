import { apiRequest } from "@/lib/queryClient";

// Helper function to make OpenAI calls through our backend API
export async function getAICompletion(endpoint: string, data: any) {
  try {
    const response = await apiRequest("POST", `/api/ai/${endpoint}`, data);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("AI completion error:", error);
    throw error;
  }
}

// Common AI operations for the resume builder
export const resumeAI = {
  // Get AI suggestions for personal summary
  enhanceSummary: async (summary: string, jobTitle: string) => {
    return getAICompletion("enhance-summary", { summary, jobTitle });
  },
  
  // Get AI suggestions for job achievements
  enhanceAchievement: async (responsibility: string, jobTitle?: string) => {
    return getAICompletion("enhance-achievement", { responsibility, jobTitle });
  },
  
  // Get AI skill suggestions based on job title
  suggestSkills: async (jobTitle: string, currentSkills: string[] = []) => {
    return getAICompletion("suggest-skills", { jobTitle, currentSkills });
  },
  
  // Match resume against job description
  matchJobDescription: async (resumeData: any, jobDescription: string) => {
    return getAICompletion("match-job", { resumeData, jobDescription });
  },
  
  // Grammar and style check for text
  checkGrammar: async (text: string) => {
    return getAICompletion("check-grammar", { text });
  }
};
