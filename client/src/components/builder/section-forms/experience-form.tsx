import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Edit, Save } from "lucide-react";
import { useResume } from "@/hooks/use-resume";
import { Experience } from "@shared/schema";

export function ExperienceForm() {
  const { resumeState, addExperience, updateExperience, removeExperience } = useResume();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Experience>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  
  const handleChange = (field: keyof Experience, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    if (editIndex !== null) {
      updateExperience(editIndex, formData);
      setEditIndex(null);
    } else {
      addExperience(formData);
    }
    
    // Reset form
    setFormData({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };
  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(resumeState.experience[index]);
  };
  
  const handleDelete = (index: number) => {
    removeExperience(index);
    
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      });
    }
  };
  
  const isFormValid = formData.title && formData.company && formData.startDate && formData.description;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Job Title</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Senior UX Designer"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Company</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="TechVision Solutions"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Location</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-1">Start Date</Label>
            <Input 
              className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              placeholder="Jun 2020"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-1">End Date</Label>
            <Input 
              className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              placeholder="Present (leave blank if current)"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Description (Use separate lines for bullet points)</Label>
          <Textarea 
            className="w-full h-24 bg-dark-900/70 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Led redesign of flagship product increasing user retention by 35%&#10;Managed team of 5 designers across 3 product lines"
          />
        </div>
        
        <Button
          className="w-full bg-primary-600 hover:bg-primary-700"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <Save className="h-4 w-4 mr-2" />
          {editIndex !== null ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Experience List</h3>
        
        {resumeState.experience.length === 0 ? (
          <div className="text-sm text-gray-400 italic">No experience entries yet. Add your work history above.</div>
        ) : (
          <div className="space-y-2">
            {resumeState.experience.map((exp, index) => (
              <div key={index} className="bg-dark-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-white">{exp.title}</h4>
                  <p className="text-xs text-gray-400">{exp.company} | {exp.startDate} - {exp.endDate || "Present"}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
