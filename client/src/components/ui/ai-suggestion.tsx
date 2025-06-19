import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";
import { Button } from "./button";

interface AISuggestionProps {
  title?: string;
  suggestion: string;
  onApply?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function AISuggestion({ 
  title = "AI Suggestion", 
  suggestion, 
  onApply, 
  onDismiss,
  className 
}: AISuggestionProps) {
  return (
    <div className={cn("bg-primary-900/20 border border-primary-800 rounded-lg p-3 fade-in-up ai-pulse", className)}>
      <div className="flex items-start gap-2">
        <div className="text-primary-400 mt-0.5">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary-300">{title}</h3>
          <p className="text-xs text-gray-300 mt-1">{suggestion}</p>
          {(onApply || onDismiss) && (
            <div className="flex gap-2 mt-2">
              {onApply && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onApply}
                  className="text-xs bg-primary-600/20 hover:bg-primary-600/30 text-primary-300 py-1 px-2 h-auto"
                >
                  Apply
                </Button>
              )}
              {onDismiss && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onDismiss}
                  className="text-xs bg-dark-800 hover:bg-dark-700 text-gray-300 py-1 px-2 h-auto"
                >
                  Dismiss
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
