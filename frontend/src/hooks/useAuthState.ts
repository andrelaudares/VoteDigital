import { useState, useEffect } from "react";
// import { supabase } from "@/integrations/supabase/client"; // Remover ou comentar
import { UserAuth } from "@/types/auth"; // Manter tipo
// import { useUserProfile } from "./useUserProfile"; // Remover

export const useAuthState = () => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState(true);
  // const { fetchUserProfile } = useUserProfile(); // Remover

  // Calculate derived properties from user
  const isGlobalAdmin = user?.role === 'admin';
  const isAccountAdmin = user?.role === 'account_admin';
  const isAuthenticated = user !== null;

  useEffect(() => {
    // Simular verificação de estado de autenticação inicial (ex: do localStorage)
    const checkMockSession = () => {
      try {
        const storedUser = localStorage.getItem('mock_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao ler estado simulado:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkMockSession();
    
    // Não precisa de listener de auth state change do Supabase
    // Retornar uma função de limpeza vazia ou remover completamente se não houver side effects a limpar
    return () => {
      // Limpeza simulada, se necessário
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez ao montar

  // Adicionar listener para mudanças no localStorage, se quiser refletir logout em outra aba
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'mock_user') {
        if (event.newValue) {
          setUser(JSON.parse(event.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    isGlobalAdmin,
    isAccountAdmin,
    isAuthenticated
  };
};
