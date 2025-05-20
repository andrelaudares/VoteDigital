
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-vote-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar seus processos de votação?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Comece agora mesmo com nosso período de teste gratuito e descubra como o VoteDigital pode simplificar suas votações.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-vote-danger text-white hover:bg-vote-danger/90 text-lg font-medium">
            <Link to="/registro">Criar conta grátis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
