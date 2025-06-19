import { Resume, PersonalInfo, Experience, Education } from "@shared/schema";

export interface IStorage {
  // Resume operations
  getResumeById(id: string): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  createResume(resume: Omit<Resume, "id">): Promise<Resume>;
  updateResume(id: string, resume: Partial<Resume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
  
  // User operations from original schema
  getUser(id: number): Promise<{ id: number; username: string; password: string; } | undefined>;
  getUserByUsername(username: string): Promise<{ id: number; username: string; password: string; } | undefined>;
  createUser(user: { username: string; password: string; }): Promise<{ id: number; username: string; password: string; }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, { id: number; username: string; password: string; }>;
  private resumes: Map<string, Resume>;
  private currentUserId: number;
  
  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.currentUserId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Add a sample resume
    const sampleResume: Resume = {
      id: "1",
      userId: null,
      name: "Sample Resume",
      templateId: "modern",
      personalInfo: {
        fullName: "Alex Johnson",
        jobTitle: "Senior UX Designer",
        email: "alex.johnson@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        summary: "Senior UX Designer with 8+ years of experience creating intuitive digital experiences for high-profile clients. Specializing in user research, wireframing, and prototyping with a focus on accessibility. Proven track record of increasing user engagement by 40% through data-driven design improvements."
      },
      experience: [
        {
          title: "Lead UX Designer",
          company: "TechVision Solutions",
          location: "San Francisco, CA",
          startDate: "2020",
          endDate: "Present",
          description: "Led redesign of flagship product increasing user retention by 35%\nManaged team of 5 designers across 3 product lines\nImplemented accessibility standards across all digital products"
        },
        {
          title: "Senior UX Designer",
          company: "DigitalCraft Agency",
          location: "Seattle, WA",
          startDate: "2017",
          endDate: "2020",
          description: "Designed interfaces for 15+ web and mobile applications\nConducted user research sessions and usability testing\nCreated design system used across all client projects"
        }
      ],
      education: [
        {
          institution: "California Institute of Design",
          degree: "Master of Design",
          graduationYear: "2015",
          description: ""
        },
        {
          institution: "University of Washington",
          degree: "Bachelor of Arts, Visual Communication",
          graduationYear: "2013",
          description: ""
        }
      ],
      skills: [
        "User Experience Design",
        "Figma",
        "Adobe XD",
        "Wireframing",
        "Prototyping",
        "User Testing",
        "UI Design",
        "Information Architecture",
        "Sketch",
        "Design Systems"
      ]
    };
    
    this.resumes.set(sampleResume.id, sampleResume);
  }
  
  // Resume operations
  async getResumeById(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }
  
  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }
  
  async createResume(resume: Omit<Resume, "id">): Promise<Resume> {
    const id = Date.now().toString();
    const newResume = { ...resume, id };
    this.resumes.set(id, newResume);
    return newResume;
  }
  
  async updateResume(id: string, resumeData: Partial<Resume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    
    if (!resume) {
      return undefined;
    }
    
    const updatedResume = { ...resume, ...resumeData };
    this.resumes.set(id, updatedResume);
    
    return updatedResume;
  }
  
  async deleteResume(id: string): Promise<boolean> {
    return this.resumes.delete(id);
  }
  
  // User operations - original from template
  async getUser(id: number): Promise<{ id: number; username: string; password: string; } | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<{ id: number; username: string; password: string; } | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: { username: string; password: string; }): Promise<{ id: number; username: string; password: string; }> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
