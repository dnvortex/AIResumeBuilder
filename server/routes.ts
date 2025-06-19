import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateAICompletion, enhanceSummary, enhanceAchievement, suggestSkills, matchJobDescription } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume APIs
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: "Failed to get resumes" });
    }
  });

  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const resume = await storage.getResumeById(req.params.id);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: "Failed to get resume" });
    }
  });

  app.post("/api/resumes", async (req, res) => {
    try {
      const resume = await storage.createResume(req.body);
      res.status(201).json(resume);
    } catch (error) {
      res.status(500).json({ error: "Failed to create resume" });
    }
  });

  app.put("/api/resumes/:id", async (req, res) => {
    try {
      const resume = await storage.updateResume(req.params.id, req.body);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: "Failed to update resume" });
    }
  });

  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const success = await storage.deleteResume(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resume" });
    }
  });

  // AI APIs
  app.post("/api/resume/enhance-summary", async (req, res) => {
    try {
      const { summary, jobTitle } = req.body;
      
      if (!summary) {
        return res.status(400).json({ error: "Summary is required" });
      }
      
      const result = await enhanceSummary(summary, jobTitle);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to enhance summary" });
    }
  });

  app.post("/api/resume/enhance-achievement", async (req, res) => {
    try {
      const { responsibility, jobTitle } = req.body;
      
      if (!responsibility) {
        return res.status(400).json({ error: "Responsibility is required" });
      }
      
      const result = await enhanceAchievement(responsibility, jobTitle);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to enhance achievement" });
    }
  });

  app.post("/api/resume/suggest-skills", async (req, res) => {
    try {
      const { jobTitle, currentSkills = [] } = req.body;
      
      if (!jobTitle) {
        return res.status(400).json({ error: "Job title is required" });
      }
      
      const result = await suggestSkills(jobTitle, currentSkills);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to suggest skills" });
    }
  });

  app.post("/api/resume/match-job", async (req, res) => {
    try {
      const { resumeId, jobDescription } = req.body;
      
      if (!resumeId || !jobDescription) {
        return res.status(400).json({ error: "Resume ID and job description are required" });
      }
      
      const resume = await storage.getResumeById(resumeId);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      const result = await matchJobDescription(resume, jobDescription);
      
      // Update resume with optimized content if available
      if (result.optimizedResume) {
        await storage.updateResume(resumeId, result.optimizedResume);
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to match job description" });
    }
  });

  // Generic AI completion endpoint
  app.post("/api/ai/:endpoint", async (req, res) => {
    try {
      const endpoint = req.params.endpoint;
      const data = req.body;
      
      const result = await generateAICompletion(endpoint, data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "AI completion failed" });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
