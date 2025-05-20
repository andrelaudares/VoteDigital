
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for better UX
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
    }`}>
      <div className="vote-container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-vote-primary">Vote</span>
              <span className="text-2xl font-bold text-vote-accent">Digital</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-vote-primary font-medium transition-colors">
              Início
            </Link>
            <Link to="/como-funciona" className="text-gray-700 hover:text-vote-primary font-medium transition-colors">
              Como Funciona
            </Link>
            <Link to="/solucoes" className="text-gray-700 hover:text-vote-primary font-medium transition-colors">
              Soluções
            </Link>
            <Link to="/sobre" className="text-gray-700 hover:text-vote-primary font-medium transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-vote-primary font-medium transition-colors">
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-vote-primary text-vote-primary hover:bg-vote-primary hover:text-white font-medium" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button className="bg-vote-danger text-white hover:bg-vote-danger/90 font-medium" asChild>
              <Link to="/registro">Criar Votação</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-vote-primary font-medium px-4 py-2 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/como-funciona" 
              className="text-gray-700 hover:text-vote-primary font-medium px-4 py-2 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/solucoes" 
              className="text-gray-700 hover:text-vote-primary font-medium px-4 py-2 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluções
            </Link>
            <Link 
              to="/sobre" 
              className="text-gray-700 hover:text-vote-primary font-medium px-4 py-2 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contato" 
              className="text-gray-700 hover:text-vote-primary font-medium px-4 py-2 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
              <Button variant="outline" className="border-vote-primary text-vote-primary hover:bg-vote-primary hover:text-white w-full justify-center" asChild>
                <Link to="/login" className="w-full text-center" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
              </Button>
              <Button className="bg-vote-danger text-white hover:bg-vote-danger/90 w-full justify-center" asChild>
                <Link to="/registro" className="w-full text-center" onClick={() => setIsMenuOpen(false)}>Criar Votação</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
