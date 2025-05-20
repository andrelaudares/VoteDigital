
import React from "react";
import TestimonialCard from "@/components/TestimonialCard";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Histórias de sucesso de quem já transformou seus processos de votação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="O VoteDigital revolucionou nossas eleições sindicais. O processo ficou muito mais transparente e confiável."
            author="Carlos Silva"
            role="Diretor de Sindicato"
            company="Sindicato dos Metalúrgicos"
            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <TestimonialCard
            quote="A facilidade de uso da plataforma nos permitiu organizar votações complexas sem nenhum conhecimento técnico."
            author="Ana Oliveira"
            role="Gestora de RH"
            company="Empresa ABC"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <TestimonialCard
            quote="Os relatórios detalhados e a segurança do sistema foram fundamentais para nossa assembleia de acionistas."
            author="Roberto Santos"
            role="Diretor Financeiro"
            company="Grupo XYZ"
            avatarUrl="https://randomuser.me/api/portraits/men/67.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
