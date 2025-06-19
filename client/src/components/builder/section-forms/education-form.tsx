import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Edit, Save } from "lucide-react";
import { useResume } from "@/hooks/use-resume";
import { Education } from "@shared/schema";

export function EducationForm() {
  const { resumeState, addEducation, updateEducation, removeEducation } = useResume();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    institution: "",
    degree: "",
    graduationYear: "",
    description: ""
  });
  
  const handleChange = (field: keyof Education, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    if (editIndex !== null) {
      updateEducation(editIndex, formData);
      setEditIndex(null);
    } else {
      addEducation(formData);
    }
    
    // Reset form
    setFormData({
      institution: "",
      degree: "",
      graduationYear: "",
      description: ""
    });
  };
  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(resumeState.education[index]);
  };
  
  const handleDelete = (index: number) => {
    removeEducation(index);
    
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({
        institution: "",
        degree: "",
        graduationYear: "",
        description: ""
      });
    }
  };
  
  const isFormValid = formData.institution && formData.degree && formData.graduationYear;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Institution</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            placeholder="University of Washington"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Degree</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
            placeholder="Bachelor of Arts, Visual Communication"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Graduation Year</Label>
          <Input 
            className="w-full bg-dark-900/70 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={formData.graduationYear}
            onChange={(e) => handleChange("graduationYear", e.target.value)}
            placeholder="2013"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-1">Description (Optional)</Label>
          <Textarea 
            className="w-full h-20 bg-dark-900/70 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Relevant coursework, awards, or achievements"
          />
        </div>
        
        <Button
          className="w-full bg-primary-600 hover:bg-primary-700"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <Save className="h-4 w-4 mr-2" />
          {editIndex !== null ? "Update Education" : "Add Education"}
        </Button>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Education List</h3>
        
        {resumeState.education.length === 0 ? (
          <div className="text-sm text-gray-400 italic">No education entries yet. Add your education above.</div>
        ) : (
          <div className="space-y-2">
            {resumeState.education.map((edu, index) => (
              <div key={index} className="bg-dark-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-white">{edu.degree}</h4>
                  <p className="text-xs text-gray-400">{edu.institution} | {edu.graduationYear}</p>
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
