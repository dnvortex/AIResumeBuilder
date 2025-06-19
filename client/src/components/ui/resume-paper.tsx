import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ResumePaperProps {
  children: ReactNode;
  className?: string;
}

export function ResumePaper({ children, className }: ResumePaperProps) {
  return (
    <div className={cn("resume-paper w-full h-full overflow-y-auto rounded-lg p-8", className)}>
      {children}
    </div>
  );
}
