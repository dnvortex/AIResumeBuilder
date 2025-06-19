import { useLocation } from "wouter";
import { FileText, Eye, Zap, Download } from "lucide-react";

export function MobileNavigation() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { name: "Editor", icon: FileText, action: () => {} },
    { name: "Preview", icon: Eye, action: () => {} },
    { name: "AI Tools", icon: Zap, action: () => {} },
    { name: "Export", icon: Download, action: () => {} }
  ];
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-md border-t border-gray-800 p-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <button 
            key={index}
            className={`flex flex-col items-center p-2 ${index === 0 ? 'text-primary-400' : 'text-gray-500'}`}
            onClick={item.action}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
