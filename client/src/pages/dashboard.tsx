import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, FileText, Download, Trash2 } from "lucide-react";
import { useResume } from "@/hooks/use-resume";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  // Protect this route - redirects to login if user is not authenticated
  const { loading } = useProtectedRoute();
  const { toast } = useToast();
  const { resetResume } = useResume();
  const [savedResumes, setSavedResumes] = useState([
    { id: "1", name: "Software Developer Resume", lastModified: "2023-10-15" },
    { id: "2", name: "UX Designer Resume", lastModified: "2023-10-10" }
  ]);
  
  const handleCreateNew = () => {
    resetResume();
  };
  
  const handleDeleteResume = (id: string) => {
    // In a real app, this would call an API to delete the resume
    setSavedResumes(prev => prev.filter(resume => resume.id !== id));
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully",
    });
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </GlassCard>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-accent font-semibold">My Resumes</h1>
              <Link href="/">
                <Button className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2" onClick={handleCreateNew}>
                  <Plus className="h-4 w-4" />
                  Create New Resume
                </Button>
              </Link>
            </div>
            
            {savedResumes.length > 0 ? (
              <div className="space-y-4">
                {savedResumes.map(resume => (
                  <div key={resume.id} className="flex justify-between items-center p-4 bg-dark-900/50 rounded-lg border border-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-white">{resume.name}</h3>
                      <p className="text-sm text-gray-400">Last modified: {resume.lastModified}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/">
                        <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                          <FileText className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 border-gray-700" onClick={() => handleDeleteResume(resume.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No resumes yet</h3>
                <p className="text-gray-400 mb-4">Create your first resume to get started</p>
                <Link href="/">
                  <Button className="bg-primary-600 hover:bg-primary-700" onClick={handleCreateNew}>
                    Create Resume
                  </Button>
                </Link>
              </div>
            )}
          </GlassCard>
          
          <GlassCard>
            <h2 className="text-xl font-accent font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="p-3 bg-dark-900/50 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-300">You created a new resume <span className="text-primary-400">Software Developer Resume</span></p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
              <div className="p-3 bg-dark-900/50 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-300">You downloaded <span className="text-primary-400">UX Designer Resume</span> as PDF</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
