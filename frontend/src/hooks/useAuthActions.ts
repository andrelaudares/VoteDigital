import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
// import { supabase } from "@/integrations/supabase/client"; // Remover ou comentar esta linha
// import { cleanupAuthState } from "@/utils/authUtils"; // Manter se for ajustar authUtils para simulação

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simular um usuário autenticado simples para demonstração
  const mockUser = {
    id: "mock-user-id",
    email: "demo@example.com",
    name: "Usuário Demo",
    role: "user",
    permissions: [] // Adicione permissões mockadas se necessário
  };

  const login = async (email: string, password: string, redirectUrl?: string) => {
    setLoading(true);
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular login bem-sucedido para qualquer credencial (ou validar hardcoded)
    if (email === "teste@teste.com" && password === "123123") {
       // Em um cenário real, você validaria as credenciais com um backend/auth service

      // Simular salvamento no localStorage para persistência básica (opcional)
      localStorage.setItem('mock_user', JSON.stringify(mockUser));

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo de volta!`,
      });
      
      // Redirecionar para a URL de redirecionamento ou padrão de usuário
      navigate(redirectUrl || "/usuario"); // Redireciona para /usuario ou a URL especificada
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Email ou senha incorretos (Simulado).",
        variant: "destructive",
      });
      throw new Error("Email ou senha incorretos (Simulado).");
    }
    
    setLoading(false);
  };
  
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
     // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simular registro bem-sucedido (não criará usuário real)
    console.log(`Simulando registro para: ${email}, Nome: ${name}`);

    // Em um cenário real, você enviaria dados para um backend para criar o usuário no Supabase e Cliente no Asaas

    toast({
      title: "Registro realizado com sucesso",
      description: "Registro simulado. Prossiga para o onboarding.",
    });
    
     setLoading(false);

     // Não faz throw error aqui para seguir o fluxo de registro da página
  };

  const logout = async () => {
    setLoading(true);
     // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    // Limpar estado simulado
    localStorage.removeItem('mock_user');

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso (Simulado).",
    });
    
    // Forçar refresh para limpar o estado (como era antes)
    window.location.href = "/";

    setLoading(false);
  };

  return {
    login,
    register,
    logout,
    loading,
    setLoading
  };
};
