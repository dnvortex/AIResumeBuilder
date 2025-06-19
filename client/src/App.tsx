import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import { ResumeProvider } from "@/hooks/use-resume";
import { AuthProvider } from "@/hooks/use-auth";
import { CSSAnimatedBackground } from "@/components/layout/css-animated-background";

// Lazy load pages
const Login = lazy(() => import("@/pages/login"));
const Signup = lazy(() => import("@/pages/signup"));

function Router() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ResumeProvider>
          <CSSAnimatedBackground>
            <Router />
            <Toaster />
          </CSSAnimatedBackground>
        </ResumeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
