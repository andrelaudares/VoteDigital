
import React, { createContext, useContext } from "react";
import { UserAuth } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthActions } from "@/hooks/useAuthActions";

interface AuthContextType {
  user: UserAuth | null;
  login: (email: string, password: string, redirectUrl?: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isGlobalAdmin: boolean;
  isAccountAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, loading, isGlobalAdmin, isAccountAdmin, isAuthenticated 
  } = useAuthState();
  
  const { login, register, logout } = useAuthActions();

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isGlobalAdmin,
      isAccountAdmin,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
