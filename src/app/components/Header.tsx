import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  Car,
  Heart,
  ChevronDown,
  Search,
  MessageSquare,
  Home,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const logoUrl = new URL("../assets/images/logos/logo.png", import.meta.url).href;

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isInstructor, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = isAuthenticated && user
    ? isInstructor
      ? [
          { label: "Dashboard", value: "instructor-dashboard", icon: Home },
          { label: "Veículos", value: "vehicles", icon: Car },
          { label: "Aulas", value: "lessons", icon: Calendar },
          { label: "Mensagens", value: "messages", icon: MessageSquare },
        ]
      : [
          { label: "Dashboard", value: "student-dashboard", icon: Home },
          { label: "Buscar Instrutores", value: "search-instructors", icon: Search },
          { label: "Minhas Aulas", value: "my-lessons", icon: Calendar },
          { label: "Favoritos", value: "favorites", icon: Heart },
          { label: "Mensagens", value: "messages", icon: MessageSquare },
        ]
    : [
        { label: "Home", value: "home", icon: Home },
        { label: "Sobre", value: "about", icon: null },
      ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2E5A88]/20 via-white/90 to-[#4CAF50]/20 backdrop-blur border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => onNavigate("home")} className="flex items-center">
            <img src={logoUrl} alt="AutoMatch" className="h-10 w-auto" />
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className="group relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#2E5A88] transition"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] transition-transform duration-300 ${
                    currentPage === item.value ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-gray-100 transition"
                >
                  {user.profile_image_url ? (
                    <img
                      src={user.profile_image_url}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user.full_name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">{user.full_name}</p>
                      <p className="text-xs text-gray-500">{isInstructor ? "Instrutor" : "Aluno"}</p>
                    </div>
                    <button
                      onClick={() => {
                        onNavigate("profile");
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      Meu perfil
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
              >
                Entrar
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden w-full border-t border-gray-100 bg-white py-2">
            {isAuthenticated && user ? (
              <div className="px-6 py-3 border-b border-gray-100">
                <p className="font-medium text-gray-900 truncate">{user.full_name}</p>
                <p className="text-xs text-gray-500">{isInstructor ? "Instrutor" : "Aluno"}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 text-sm bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white shadow-md hover:shadow-lg mb-2"
              >
                <User className="w-5 h-5" />
                Entrar
              </button>
            )}

            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm ${
                  currentPage === item.value
                    ? "bg-gradient-to-r from-[#2E5A88]/10 to-[#4CAF50]/10 text-[#2E5A88]"
                    : "text-gray-700"
                }`}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
              </button>
            ))}

            {isAuthenticated && user && (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-6 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            )}
          </div>
        )}
      </div>

      <div className="h-[2px] bg-gradient-to-r from-[#2E5A88] to-[#4CAF50]" />
    </header>
  );
};
