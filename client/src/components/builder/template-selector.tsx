import { GlassCard } from "@/components/ui/glass-card";
import { useResume } from "@/hooks/use-resume";

export function TemplateSelector() {
  const { resumeState, setResumeState } = useResume();
  
  const templates = [
    { id: "modern", name: "Modern", image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
    { id: "professional", name: "Professional", image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
    { id: "creative", name: "Creative", image: "https://images.unsplash.com/photo-1611532736576-acf8ec38fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" }
  ];
  
  const handleTemplateSelect = (templateId: string) => {
    setResumeState(prev => ({ ...prev, templateId }));
  };
  
  return (
    <GlassCard>
      <h2 className="text-xl font-accent font-semibold mb-4">Choose Template</h2>
      <div className="grid grid-cols-3 gap-3">
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`relative ${resumeState.templateId === template.id ? 'glow-border' : ''} rounded-lg overflow-hidden cursor-pointer bg-dark-900 p-1`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <img 
              src={template.image} 
              alt={`${template.name} template`} 
              className={`w-full h-24 object-cover rounded-md ${resumeState.templateId === template.id ? 'opacity-80' : 'opacity-60'}`} 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-dark-900/80 to-transparent">
              <span className="text-xs font-medium">{template.name}</span>
            </div>
            {resumeState.templateId === template.id && (
              <div className="absolute top-1 right-1 w-3 h-3 bg-primary-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
