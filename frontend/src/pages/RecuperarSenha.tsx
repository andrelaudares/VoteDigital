
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulando envio de email (em produção, integrar com backend)
    setTimeout(() => {
      toast({
        title: "Link enviado",
        description: "Verifique seu email para redefinir sua senha",
      });
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Recuperar senha</CardTitle>
            <CardDescription className="text-center">
              {!sent 
                ? "Informe seu email para receber instruções de recuperação de senha" 
                : "Verifique seu email para continuar o processo de recuperação de senha"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Enviar instruções"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                  <p>Um link de redefinição de senha foi enviado para:</p>
                  <p className="font-medium">{email}</p>
                </div>
                <p className="text-gray-600">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha. O link de redefinição expirará em 24 horas.
                </p>
                <p className="text-gray-600">
                  Não recebeu? Verifique sua pasta de spam ou solicite um novo link.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSent(false)}
                >
                  Enviar novamente
                </Button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              <Link to="/login" className="text-vote-primary hover:underline flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default RecuperarSenha;
