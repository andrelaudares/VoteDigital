
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { Building2, Users2, GraduationCap } from "lucide-react";

const SolutionsSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluções para todos os segmentos</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Atendendo às necessidades específicas de diferentes organizações e tipos de votação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SolutionCard 
            title="Eleições Corporativas"
            description="Ideal para eleições de conselhos, CIPA, associações e sindicatos."
            icon={<Building2 className="h-12 w-12 text-vote-primary" />}
          />
          <SolutionCard 
            title="Assembleias e Reuniões"
            description="Perfeito para votações em tempo real durante assembleias e reuniões de acionistas."
            icon={<Users2 className="h-12 w-12 text-vote-primary" />}
          />
          <SolutionCard 
            title="Instituições de Ensino"
            description="Facilite eleições estudantis, grêmios e processos decisórios acadêmicos."
            icon={<GraduationCap className="h-12 w-12 text-vote-primary" />}
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
