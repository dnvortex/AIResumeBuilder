import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

/**
 * A hook to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export function useProtectedRoute() {
  const { user, loading } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      setLocation("/login");
    }
  }, [user, loading, setLocation]);

  return { user, loading };
}