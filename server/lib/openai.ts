import { HfInference } from "@huggingface/inference";

// Initialize Hugging Face Inference with API key from environment variables
const hf = new HfInference(
  process.env.HUGGINGFACE_API_TOKEN || "dummy_token_for_development"
);

// Define default models for different types of tasks
const DEFAULT_TEXT_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"; // For text generation tasks

// Generic function for AI completions
export async function generateAICompletion(endpoint: string, data: any) {
  try {
    // Choose which specific function to call based on the endpoint
    switch (endpoint) {
      case "enhance-summary":
        return await enhanceSummary(data.summary, data.jobTitle);
      case "enhance-achievement":
        return await enhanceAchievement(data.responsibility, data.jobTitle);
      case "suggest-skills":
        return await suggestSkills(data.jobTitle, data.currentSkills);
      case "match-job":
        return await matchJobDescription(data.resumeData, data.jobDescription);
      case "check-grammar":
        return await checkGrammar(data.text);
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  } catch (error) {
    console.error("AI completion error:", error);
    throw error;
  }
}

// Function to enhance a resume summary
export async function enhanceSummary(summary: string, jobTitle?: string) {
  try {
    const prompt = `
<instructions>
You are an expert resume writer specializing in professional summaries. 
Provide suggestions to improve resume summaries with quantifiable achievements and impactful language.
Please enhance this professional summary for a ${jobTitle || "professional"}:

"${summary}"

Respond in this JSON format:
{
  "suggestions": "List specific improvements that could be made",
  "enhancedSummary": "The complete rewritten summary with improvements applied"
}
</instructions>
`;

    const response = await hf.textGeneration({
      model: DEFAULT_TEXT_MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false,
      }
    });

    // Extract JSON from the response
    const responseText = response.generated_text || "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    let result;
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from response:", e);
        result = {};
      }
    } else {
      console.warn("No JSON found in response");
      result = {};
    }
    
    return {
      suggestion: result.suggestions || "Try adding more quantifiable achievements and using stronger action verbs.",
      enhancedSummary: result.enhancedSummary || summary
    };
  } catch (error) {
    console.error("Error enhancing summary:", error);
    throw error;
  }
}

// Function to enhance job achievements/responsibilities
export async function enhanceAchievement(responsibility: string, jobTitle?: string) {
  try {
    const prompt = `
<instructions>
You are an expert resume writer specializing in transforming basic job responsibilities into impressive achievement statements with metrics and results.
Transform this basic job responsibility for a ${jobTitle || "professional"} into 3 different achievement statements with metrics and quantifiable results:

"${responsibility}"

Respond in this JSON format:
{
  "achievements": [
    "First achievement statement with metrics",
    "Second achievement statement with metrics",
    "Third achievement statement with metrics"
  ]
}
</instructions>
`;

    const response = await hf.textGeneration({
      model: DEFAULT_TEXT_MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false,
      }
    });

    // Extract JSON from the response
    const responseText = response.generated_text || "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    let result;
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from response:", e);
        result = {};
      }
    } else {
      console.warn("No JSON found in response");
      result = {};
    }
    
    return {
      enhancedAchievements: result.achievements || [
        `${responsibility} resulting in 20% improvement in efficiency`,
        `Led ${responsibility} initiative, generating 15% increase in user satisfaction`,
        `Executed ${responsibility} strategy that reduced costs by 10%`
      ]
    };
  } catch (error) {
    console.error("Error enhancing achievement:", error);
    throw error;
  }
}

// Function to suggest skills based on job title
export async function suggestSkills(jobTitle: string, currentSkills: string[] = []) {
  try {
    const prompt = `
<instructions>
You are an expert job market analyst who provides relevant in-demand skills for different professions.
Suggest 8-10 relevant technical and soft skills for a ${jobTitle} that would be valuable on a resume. 
Current skills (avoid duplicating these): ${currentSkills.join(", ")}

Respond in this JSON format:
{
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6",
    "Skill 7",
    "Skill 8"
  ]
}
</instructions>
`;

    const response = await hf.textGeneration({
      model: DEFAULT_TEXT_MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false,
      }
    });

    // Extract JSON from the response
    const responseText = response.generated_text || "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    let result;
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from response:", e);
        result = {};
      }
    } else {
      console.warn("No JSON found in response");
      result = {};
    }
    
    return {
      suggestedSkills: result.skills || [
        "Communication",
        "Leadership",
        "Project Management",
        "Data Analysis",
        "Problem-Solving",
        "Teamwork",
        "Critical Thinking",
        "Adaptability"
      ]
    };
  } catch (error) {
    console.error("Error suggesting skills:", error);
    throw error;
  }
}

// Function to match resume against job description
export async function matchJobDescription(resumeData: any, jobDescription: string) {
  try {
    const prompt = `
<instructions>
You are an expert ATS (Applicant Tracking System) optimizer and resume consultant. Analyze resumes against job descriptions to identify gaps and suggest improvements.
Analyze this resume against the job description. Identify keyword matches, missing keywords, and suggest specific improvements.

RESUME:
${JSON.stringify(resumeData)}

JOB DESCRIPTION:
${jobDescription}

Respond in this JSON format:
{
  "keywordMatches": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword3", "keyword4"],
  "suggestions": ["suggestion1", "suggestion2"],
  "matchScore": 75
}
</instructions>
`;

    const response = await hf.textGeneration({
      model: DEFAULT_TEXT_MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
        return_full_text: false,
      }
    });

    // Extract JSON from the response
    const responseText = response.generated_text || "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    let result;
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from response:", e);
        result = {};
      }
    } else {
      console.warn("No JSON found in response");
      result = {};
    }
    
    return {
      keywordMatches: result.keywordMatches || [],
      missingKeywords: result.missingKeywords || [],
      suggestions: result.suggestions || [],
      matchScore: result.matchScore || 0,
      optimizedResume: null // Removing optimized resume field as it would be too large
    };
  } catch (error) {
    console.error("Error matching job description:", error);
    throw error;
  }
}

// Function to check grammar and improve writing
export async function checkGrammar(text: string) {
  try {
    const prompt = `
<instructions>
You are a professional editor who improves grammar, clarity, and conciseness while maintaining the original meaning.
Please check and improve the grammar, clarity, and professional tone of this text while maintaining its meaning:

"${text}"

Respond in this JSON format:
{
  "correctedText": "The improved version of the text",
  "corrections": ["Correction 1", "Correction 2"],
  "improvementSuggestions": ["Suggestion 1", "Suggestion 2"]
}
</instructions>
`;

    const response = await hf.textGeneration({
      model: DEFAULT_TEXT_MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.3,
        return_full_text: false,
      }
    });

    // Extract JSON from the response
    const responseText = response.generated_text || "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    let result;
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Error parsing JSON from response:", e);
        result = {};
      }
    } else {
      console.warn("No JSON found in response");
      result = {};
    }
    
    return {
      correctedText: result.correctedText || text,
      corrections: result.corrections || [],
      improvementSuggestions: result.improvementSuggestions || []
    };
  } catch (error) {
    console.error("Error checking grammar:", error);
    throw error;
  }
}
