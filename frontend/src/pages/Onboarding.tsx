
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Building, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MainNavbar from "@/components/MainNavbar";
import LoadingSpinner from "@/components/ui/loading-spinner";

const passos = [
  { id: 'perfil', titulo: 'Perfil', icon: User },
  { id: 'empresa', titulo: 'Empresa', icon: Building },
  { id: 'pagamento', titulo: 'Pagamento', icon: CreditCard },
];

type DadosPerfil = {
  nome: string;
  cargo: string;
  telefone: string;
};

type DadosEmpresa = {
  nomeEmpresa: string;
  segmento: string;
  tamanho: string;
};

type DadosPagamento = {
  cartao: string;
  validade: string;
  cvv: string;
  nomeTitular: string;
};

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const planoSelecionado = searchParams.get('plano') || 'basico';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passoAtual, setPassoAtual] = useState<string>('perfil');
  const [loading, setLoading] = useState<boolean>(false);
  const [progresso, setProgresso] = useState<number>(33);
  
  const [dadosPerfil, setDadosPerfil] = useState<DadosPerfil>({
    nome: "",
    cargo: "",
    telefone: "",
  });
  
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    nomeEmpresa: "",
    segmento: "",
    tamanho: "pequena",
  });
  
  const [dadosPagamento, setDadosPagamento] = useState<DadosPagamento>({
    cartao: "",
    validade: "",
    cvv: "",
    nomeTitular: "",
  });
  
  useEffect(() => {
    switch(passoAtual) {
      case 'perfil':
        setProgresso(33);
        break;
      case 'empresa':
        setProgresso(66);
        break;
      case 'pagamento':
        setProgresso(100);
        break;
      default:
        setProgresso(33);
    }
  }, [passoAtual]);
  
  const avancar = () => {
    if (passoAtual === 'perfil') {
      if (!dadosPerfil.nome || !dadosPerfil.cargo || !dadosPerfil.telefone) {
        toast({
          title: "Preencha todos os campos",
          description: "Todos os campos são obrigatórios para prosseguir.",
          variant: "destructive",
        });
        return;
      }
      setPassoAtual('empresa');
    } else if (passoAtual === 'empresa') {
      if (!dadosEmpresa.nomeEmpresa || !dadosEmpresa.segmento) {
        toast({
          title: "Preencha todos os campos",
          description: "Nome da empresa e segmento são obrigatórios.",
          variant: "destructive",
        });
        return;
      }
      setPassoAtual('pagamento');
    } else if (passoAtual === 'pagamento') {
      if (!dadosPagamento.cartao || !dadosPagamento.validade || !dadosPagamento.cvv || !dadosPagamento.nomeTitular) {
        toast({
          title: "Preencha todos os campos",
          description: "Todos os dados do cartão são obrigatórios.",
          variant: "destructive",
        });
        return;
      }
      finalizarOnboarding();
    }
  };
  
  const voltar = () => {
    if (passoAtual === 'empresa') {
      setPassoAtual('perfil');
    } else if (passoAtual === 'pagamento') {
      setPassoAtual('empresa');
    }
  };
  
  const finalizarOnboarding = () => {
    setLoading(true);
    
    // Simulando processamento de assinatura
    setTimeout(() => {
      toast({
        title: "Assinatura concluída com sucesso!",
        description: `Seu plano ${planoSelecionado.charAt(0).toUpperCase() + planoSelecionado.slice(1)} foi ativado.`,
      });
      setLoading(false);
      navigate('/usuario');
    }, 2000);
  };

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosPerfil(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosEmpresa(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosPagamento(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const formatCartao = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    const grupos = apenasNumeros.match(/.{1,4}/g) || [];
    return grupos.join(' ').substr(0, 19);
  };
  
  const formatValidade = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 2) return apenasNumeros;
    return `${apenasNumeros.substring(0, 2)}/${apenasNumeros.substring(2, 4)}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavbar />
      
      <div className="flex-grow py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Configure sua conta</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Plano selecionado: <span className="font-medium">{planoSelecionado.charAt(0).toUpperCase() + planoSelecionado.slice(1)}</span>
            </p>
          </div>
          
          {/* Barra de progresso */}
          <div className="relative mb-10">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-vote-primary rounded-full transition-all" 
                style={{ width: `${progresso}%` }} 
              />
            </div>
            <div className="flex justify-between mt-3">
              {passos.map((passo) => (
                <div 
                  key={passo.id} 
                  className={`flex flex-col items-center ${passoAtual === passo.id ? 'text-vote-primary' : 'text-gray-500'}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      passoAtual === passo.id 
                        ? 'bg-vote-primary text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <passo.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm mt-1">{passo.titulo}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {passoAtual === 'perfil' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Dados Pessoais</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input 
                        id="nome" 
                        name="nome" 
                        placeholder="Digite seu nome completo" 
                        value={dadosPerfil.nome}
                        onChange={handlePerfilChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input 
                        id="cargo" 
                        name="cargo" 
                        placeholder="Digite seu cargo na empresa" 
                        value={dadosPerfil.cargo}
                        onChange={handlePerfilChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input 
                        id="telefone" 
                        name="telefone" 
                        placeholder="(00) 00000-0000" 
                        value={dadosPerfil.telefone}
                        onChange={handlePerfilChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {passoAtual === 'empresa' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Dados da Empresa</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nomeEmpresa">Nome da empresa</Label>
                      <Input 
                        id="nomeEmpresa" 
                        name="nomeEmpresa" 
                        placeholder="Digite o nome da empresa" 
                        value={dadosEmpresa.nomeEmpresa}
                        onChange={handleEmpresaChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="segmento">Segmento</Label>
                      <Input 
                        id="segmento" 
                        name="segmento" 
                        placeholder="Ex: Educação, Saúde, Tecnologia, etc." 
                        value={dadosEmpresa.segmento}
                        onChange={handleEmpresaChange}
                      />
                    </div>
                    
                    <div>
                      <Label>Tamanho da empresa</Label>
                      <RadioGroup 
                        value={dadosEmpresa.tamanho} 
                        onValueChange={(value) => setDadosEmpresa(prev => ({ ...prev, tamanho: value }))}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="pequena" id="pequena" />
                          <Label htmlFor="pequena" className="cursor-pointer">Pequena (1-50)</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="media" id="media" />
                          <Label htmlFor="media" className="cursor-pointer">Média (51-200)</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="grande" id="grande" />
                          <Label htmlFor="grande" className="cursor-pointer">Grande (201+)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}
              
              {passoAtual === 'pagamento' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Dados de Pagamento</h2>
                  
                  <div className="p-4 bg-vote-primary/10 rounded-md mb-6">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Check className="h-6 w-6 text-vote-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Plano {planoSelecionado.charAt(0).toUpperCase() + planoSelecionado.slice(1)}</h3>
                        <p className="text-sm text-gray-500">
                          {planoSelecionado === 'basico' && 'R$ 29,90/mês'}
                          {planoSelecionado === 'premium' && 'R$ 59,90/mês'}
                          {planoSelecionado === 'empresarial' && 'R$ 99,90/mês'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cartao">Número do cartão</Label>
                      <Input 
                        id="cartao" 
                        name="cartao" 
                        placeholder="0000 0000 0000 0000" 
                        value={dadosPagamento.cartao}
                        onChange={(e) => {
                          const formatted = formatCartao(e.target.value);
                          setDadosPagamento(prev => ({ ...prev, cartao: formatted }));
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="validade">Validade</Label>
                        <Input 
                          id="validade" 
                          name="validade" 
                          placeholder="MM/AA" 
                          value={dadosPagamento.validade}
                          onChange={(e) => {
                            const formatted = formatValidade(e.target.value);
                            setDadosPagamento(prev => ({ ...prev, validade: formatted }));
                          }}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          placeholder="000" 
                          value={dadosPagamento.cvv}
                          onChange={(e) => {
                            const apenasNumeros = e.target.value.replace(/\D/g, '');
                            setDadosPagamento(prev => ({ ...prev, cvv: apenasNumeros.substring(0, 3) }));
                          }}
                          maxLength={3}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="nomeTitular">Nome do titular</Label>
                      <Input 
                        id="nomeTitular" 
                        name="nomeTitular" 
                        placeholder="Nome como aparece no cartão" 
                        value={dadosPagamento.nomeTitular}
                        onChange={handlePagamentoChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {passoAtual !== 'perfil' ? (
                  <Button variant="outline" onClick={voltar} disabled={loading}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button onClick={avancar} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {passoAtual === 'pagamento' ? 'Finalizar' : 'Continuar'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
