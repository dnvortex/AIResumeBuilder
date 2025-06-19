import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/hooks/use-resume";
import { useToast } from "@/hooks/use-toast";

export function SkillsForm() {
  const { toast } = useToast();
  const { resumeState, addSkill, removeSkill } = useResume();
  const [skill, setSkill] = useState("");

  const handleAddSkill = () => {
    if (!skill.trim()) {
      toast({
        title: "Empty skill",
        description: "Please enter a skill name",
        variant: "destructive",
      });
      return;
    }

    if (resumeState.skills.includes(skill.trim())) {
      toast({
        title: "Duplicate skill",
        description: "This skill is already in your list",
        variant: "destructive",
      });
      return;
    }

    addSkill(skill.trim());
    setSkill("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex gap-2 mb-4">
          <Input
            className="bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="Add a skill (e.g., User Experience Design)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="bg-primary-600 hover:bg-primary-700"
            onClick={handleAddSkill}
          >
            Add
          </Button>
        </div>

        {resumeState.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resumeState.skills.map((skillItem, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-dark-900/80 text-gray-200 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-700"
              >
                {skillItem}
                <button
                  onClick={() => removeSkill(index)}
                  className="text-gray-400 hover:text-red-400 focus:outline-none"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic">No skills added yet. Add skills above to highlight your expertise.</div>
        )}
      </div>

      <div className="p-3 bg-dark-900/30 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Tips for Skills Section:</h3>
        <ul className="list-disc ml-5 text-xs text-gray-400 space-y-1">
          <li>Add relevant skills for your target role</li>
          <li>Include both technical and soft skills</li>
          <li>Be specific rather than generic (e.g., "React" instead of just "Programming")</li>
          <li>List tools and software you're proficient with</li>
        </ul>
      </div>
    </div>
  );
}
