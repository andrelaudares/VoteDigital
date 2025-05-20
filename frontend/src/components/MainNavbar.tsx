import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  Vote,
  Shield,
  Home,
  Bell,
  LogOut
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const MainNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Checar se estamos em uma página interna do sistema (admin ou usuário)
  const isSystemPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/usuario');

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    toast({
      title: newMode ? "Modo escuro ativado" : "Modo claro ativado",
      duration: 1500,
    });
  };

  const navItems: NavItem[] = [
    { label: "Início", path: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Votar", path: "/votar/1", icon: <Vote className="h-5 w-5" /> },
    { label: "Área do Usuário", path: "/usuario", icon: <User className="h-5 w-5" /> },
    { label: "Admin", path: "/admin", icon: <Shield className="h-5 w-5" /> },
  ];

  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-md z-50 sticky top-0 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-vote-primary dark:text-white">VoteDigital</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors
                  ${location.pathname === item.path 
                    ? "bg-vote-primary text-white dark:bg-vote-primary/80" 
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {/* Notificações (apenas em páginas do sistema) */}
            {isSystemPage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 px-1 min-w-[18px] h-[18px] text-xs flex items-center justify-center">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <p className="font-medium">Nova votação criada</p>
                      <p className="text-xs text-gray-500">Há 5 minutos</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <p className="font-medium">Seu plano expira em 7 dias</p>
                      <p className="text-xs text-gray-500">Há 2 horas</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <p className="font-medium">Votação concluída</p>
                      <p className="text-xs text-gray-500">Há 1 dia</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center cursor-pointer text-vote-primary">
                    Ver todas notificações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Perfil do usuário (apenas em páginas do sistema) */}
            {isSystemPage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/usuario/perfil">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/usuario/configuracoes">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Botões de Login/Registro (apenas em páginas públicas) */}
            {!isSystemPage && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link to="/registro">Começar grátis</Link>
                </Button>
              </>
            )}

            {/* Alternador de tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isSystemPage && (
              <Button
                variant="ghost"
                size="icon"
                className="relative mr-2"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 px-1 min-w-[18px] h-[18px] text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="mr-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                  ${location.pathname === item.path
                    ? "bg-vote-primary text-white dark:bg-vote-primary/80"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {!isSystemPage && (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild className="justify-center">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="justify-center">
                  <Link to="/registro">Começar grátis</Link>
                </Button>
              </div>
            )}
            
            {isSystemPage && (
              <div className="border-t dark:border-gray-700 pt-2 mt-2">
                <Link
                  to="/usuario/perfil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-xs text-gray-500">Meu Perfil</p>
                  </div>
                </Link>
                <Link
                  to="/usuario/notificacoes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notificações</span>
                  </div>
                  {unreadNotifications > 0 && (
                    <Badge className="bg-red-500 px-1.5 min-w-[20px] text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 mt-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/");
                    toast({
                      title: "Logout realizado",
                      description: "Você foi desconectado com sucesso.",
                      duration: 3000,
                    });
                  }}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Sair</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
