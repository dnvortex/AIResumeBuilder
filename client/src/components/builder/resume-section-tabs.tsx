import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabType = "personal" | "experience" | "education" | "skills";

interface ResumeSectionTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export function ResumeSectionTabs({ activeTab, onChange }: ResumeSectionTabsProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" }
  ];
  
  return (
    <div className="flex border-b border-gray-700 mb-4">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={cn(
            "py-2 px-4 text-sm font-medium border-b-2",
            activeTab === tab.id 
              ? "border-primary-600 text-white" 
              : "border-transparent text-gray-400 hover:text-gray-300"
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
