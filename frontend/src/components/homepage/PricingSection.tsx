
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="planos" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos que cabem no seu orçamento</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades de votação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plano Básico */}
          <div className="border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Básico</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Para pequenas votações e testes</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$29,90</span>
              <span className="text-gray-500 dark:text-gray-400">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Até 5 votações por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Até 50 votantes por votação</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Relatórios básicos</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Suporte por email</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-vote-primary text-vote-primary hover:bg-vote-primary hover:text-white" asChild>
              <Link to="/registro?plano=basico">
                Começar com Básico
              </Link>
            </Button>
          </div>

          {/* Plano Premium */}
          <div className="border-2 border-vote-primary rounded-lg p-8 shadow-md relative">
            <div className="absolute top-0 right-0 bg-vote-danger text-white text-sm font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Para organizações em crescimento</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$59,90</span>
              <span className="text-gray-500 dark:text-gray-400">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Votações ilimitadas</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Até 500 votantes por votação</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Relatórios avançados</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Exportação de dados</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
            <Button className="w-full bg-vote-danger hover:bg-vote-danger/90 text-white" asChild>
              <Link to="/registro?plano=premium">
                Começar com Premium
              </Link>
            </Button>
          </div>

          {/* Plano Empresarial */}
          <div className="border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Empresarial</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Para grandes organizações</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$99,90</span>
              <span className="text-gray-500 dark:text-gray-400">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Votações ilimitadas</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Votantes ilimitados</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Integração com sistemas</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>API completa</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Suporte 24/7</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-vote-primary text-vote-primary hover:bg-vote-primary hover:text-white" asChild>
              <Link to="/registro?plano=empresarial">
                Começar com Empresarial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
