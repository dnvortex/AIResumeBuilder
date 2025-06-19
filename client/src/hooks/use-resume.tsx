import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Resume, Education, Experience } from "@shared/schema";

// Define the shape of our resume state
interface ResumeContextState {
  resumeState: Resume;
  canUndo: boolean;
  canRedo: boolean;
  setResumeState: (resume: React.SetStateAction<Resume>) => void;
  updatePersonalInfo: (personalInfo: Resume["personalInfo"]) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (index: number, experience: Experience) => void;
  removeExperience: (index: number) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  undo: () => void;
  redo: () => void;
  resetResume: () => void;
  resetResumeHistory: () => void;
}

const defaultResume: Resume = {
  id: "1",
  userId: null,
  name: "My Resume",
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

// Create a new empty resume
const createEmptyResume = (): Resume => ({
  id: Date.now().toString(),
  userId: null,
  name: "Untitled Resume",
  templateId: "modern",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: []
});

const ResumeContext = createContext<ResumeContextState | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeState, setResumeState] = useState<Resume>(defaultResume);
  const [history, setHistory] = useState<Resume[]>([defaultResume]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Add current state to history when it changes
  const addToHistory = useCallback((newState: Resume) => {
    setHistory(prev => {
      // Remove any "future" states if we're not at the end of history
      const newHistory = prev.slice(0, historyIndex + 1);
      // Add new state
      return [...newHistory, newState];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);
  
  // Debounced version of addToHistory
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only add to history if the state has changed
      if (JSON.stringify(resumeState) !== JSON.stringify(history[historyIndex])) {
        addToHistory(resumeState);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [resumeState, history, historyIndex, addToHistory]);
  
  const updatePersonalInfo = useCallback((personalInfo: Resume["personalInfo"]) => {
    setResumeState(prev => ({
      ...prev,
      personalInfo
    }));
  }, []);
  
  const addExperience = useCallback((experience: Experience) => {
    setResumeState(prev => ({
      ...prev,
      experience: [...prev.experience, experience]
    }));
  }, []);
  
  const updateExperience = useCallback((index: number, experience: Experience) => {
    setResumeState(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? experience : exp)
    }));
  }, []);
  
  const removeExperience = useCallback((index: number) => {
    setResumeState(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);
  
  const addEducation = useCallback((education: Education) => {
    setResumeState(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  }, []);
  
  const updateEducation = useCallback((index: number, education: Education) => {
    setResumeState(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? education : edu)
    }));
  }, []);
  
  const removeEducation = useCallback((index: number) => {
    setResumeState(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  }, []);
  
  const addSkill = useCallback((skill: string) => {
    setResumeState(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  }, []);
  
  const removeSkill = useCallback((index: number) => {
    setResumeState(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  }, []);
  
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setResumeState(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);
  
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setResumeState(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);
  
  const resetResume = useCallback(() => {
    const newResume = createEmptyResume();
    setResumeState(newResume);
    setHistory([newResume]);
    setHistoryIndex(0);
  }, []);
  
  const resetResumeHistory = useCallback(() => {
    setHistory([resumeState]);
    setHistoryIndex(0);
  }, [resumeState]);
  
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  
  return (
    <ResumeContext.Provider value={{
      resumeState,
      canUndo,
      canRedo,
      setResumeState,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkill,
      removeSkill,
      undo,
      redo,
      resetResume,
      resetResumeHistory
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
