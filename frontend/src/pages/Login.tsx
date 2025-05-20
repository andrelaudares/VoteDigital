
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, LogIn, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginProps {
  isAdminLogin?: boolean;
}

const Login: React.FC<LoginProps> = ({ isAdminLogin = false }) => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usar nosso contexto de autenticação
    await login(email, password, isAdminLogin ? "/admin" : "/usuario");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-vote-primary">VoteDigital</h1>
          <p className="mt-2 text-gray-600">
            {isAdminLogin 
              ? "Acesse o painel administrativo global" 
              : "Acesse sua conta"}
          </p>
        </div>

        <Alert className="bg-blue-50 text-blue-700 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {isAdminLogin ? (
              <span>Use <strong>demo-admin@votedigital.com</strong> e senha <strong>demo123</strong> para acessar como administrador global.</span>
            ) : (
              <span>Use <strong>demo-conta@votedigital.com</strong> e senha <strong>demo123</strong> para acessar como administrador de conta.</span>
            )}
          </AlertDescription>
        </Alert>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="pl-10" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="password">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="********" 
                  className="pl-10" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm cursor-pointer">Lembrar-me</Label>
              </div>
              <Link to="/recuperar-senha" className="text-sm text-vote-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </span>
            )}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isAdminLogin ? (
              <>
                Não é administrador global?{" "}
                <Link to="/login" className="text-vote-primary hover:underline">
                  Login padrão
                </Link>
              </>
            ) : (
              <>
                É um administrador global?{" "}
                <Link to="/admin/login" className="text-vote-primary hover:underline">
                  Login administrativo
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
