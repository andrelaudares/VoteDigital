import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const Registro = () => {
  const [searchParams] = useSearchParams();
  const planoSelecionado = searchParams.get('plano') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("email");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validação simples
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      await register(formData.email, formData.password, formData.nome);
      
      // Redirecionar para o onboarding passando o plano selecionado
      navigate(`/onboarding?plano=${planoSelecionado}`);
    } catch (error) {
      // Erro já tratado pelo hook useAuth
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Crie sua conta</CardTitle>
              <CardDescription className="text-center">
                {planoSelecionado ? `Plano ${planoSelecionado.charAt(0).toUpperCase() + planoSelecionado.slice(1)} selecionado` : "Escolha o método de registro"}
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4 px-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="microsoft">Microsoft</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            id="nome" 
                            name="nome"
                            placeholder="Digite seu nome completo" 
                            className="pl-10" 
                            value={formData.nome}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="seu@email.com" 
                            className="pl-10" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            id="password" 
                            name="password"
                            type="password" 
                            placeholder="********" 
                            className="pl-10" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar senha</Label>
                        <div className="relative">
                          <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password" 
                            placeholder="********" 
                            className="pl-10" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Criar conta <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="google">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-12 h-12 mb-4" />
                  <Button onClick={() => {
                    toast({
                      title: "Google Sign Up",
                      description: "Esta funcionalidade será implementada em breve",
                    });
                  }} className="w-full">Continuar com Google</Button>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="microsoft">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-12 h-12 mb-4" />
                  <Button onClick={() => {
                    toast({
                      title: "Microsoft Sign Up",
                      description: "Esta funcionalidade será implementada em breve",
                    });
                  }} className="w-full">Continuar com Microsoft</Button>
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex flex-col space-y-4 mt-4">
              <div className="text-sm text-center text-gray-500">
                Ao criar uma conta, você concorda com nossos <Link to="/termos" className="text-vote-primary hover:underline">Termos de Serviço</Link> e <Link to="/privacidade" className="text-vote-primary hover:underline">Política de Privacidade</Link>
              </div>
              <div className="text-sm text-center">
                Já tem uma conta? <Link to="/login" className="text-vote-primary hover:underline font-medium">Faça login</Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Registro;
