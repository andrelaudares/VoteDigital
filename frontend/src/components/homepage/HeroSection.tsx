
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-vote-primary to-vote-secondary py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Transforme seu processo de votação com o VoteDigital
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Plataforma completa para organizar, gerenciar e analisar votações online com segurança e transparência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-vote-danger text-white hover:bg-vote-danger/90 text-lg font-medium">
                <Link to="/registro">Começar agora</Link>
              </Button>
            </div>
            <div className="flex items-center text-sm gap-2">
              <Check className="h-5 w-5 text-white" />
              <span>Comece grátis. Sem necessidade de cartão de crédito.</span>
            </div>
          </div>
          <div className="hidden md:flex md:justify-center md:items-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-2xl flex flex-col items-center">
              <div className="bg-vote-danger/20 p-6 rounded-full mb-4">
                <Check className="h-16 w-16 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Votação Segura</h3>
                <p className="text-white/80">Confiabilidade e transparência garantidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
