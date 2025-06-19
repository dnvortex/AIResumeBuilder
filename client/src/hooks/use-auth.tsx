import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword, logoutUser } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      toast({
        title: "Success!",
        description: "Successfully signed in with Google",
      });
      return user;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const user = await registerWithEmailPassword(email, password);
      toast({
        title: "Success!",
        description: "Account created successfully",
      });
      return user;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const user = await loginWithEmailPassword(email, password);
      toast({
        title: "Success!",
        description: "Successfully signed in",
      });
      return user;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      toast({
        title: "Success!",
        description: "Successfully signed out",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: handleSignInWithGoogle,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}