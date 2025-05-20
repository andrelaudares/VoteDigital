
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos que transformam sua experiência de votação</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tudo o que você precisa para gerenciar votações eficientes, seguras e transparentes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10 text-vote-primary" />}
            title="Segurança em primeiro lugar"
            description="Criptografia avançada, autenticação em duas etapas e registro completo de auditoria para garantir a integridade dos seus processos."
          />
          <FeatureCard 
            icon={<Sparkles className="h-10 w-10 text-vote-primary" />}
            title="Interface intuitiva"
            description="Experiência de usuário simplificada que permite criar e gerenciar votações em minutos, sem conhecimento técnico."
          />
          <FeatureCard 
            icon={<Award className="h-10 w-10 text-vote-primary" />}
            title="Relatórios detalhados"
            description="Análise completa dos resultados com gráficos interativos, exportação de dados e insights estatísticos."
          />
        </div>

        <div className="text-center mt-12">
          <Button asChild className="text-lg bg-vote-primary hover:bg-vote-secondary">
            <Link to="/recursos">
              Ver todos os recursos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
