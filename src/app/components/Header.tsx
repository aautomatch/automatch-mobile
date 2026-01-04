import React, { useState } from 'react';
import { Menu, X, User, LogOut, Calendar, Car, Heart, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isInstructor, logout } = useAuth();

  const menuItems = isAuthenticated
    ? isInstructor
      ? [
          { label: 'Dashboard', value: 'instructor-dashboard', icon: Calendar },
          { label: 'Veículos', value: 'vehicles', icon: Car },
          { label: 'Aulas', value: 'lessons', icon: Calendar },
          { label: 'Perfil', value: 'profile', icon: User },
        ]
      : [
          { label: 'Dashboard', value: 'student-dashboard', icon: Calendar },
          { label: 'Buscar Instrutores', value: 'search-instructors', icon: User },
          { label: 'Minhas Aulas', value: 'my-lessons', icon: Calendar },
          { label: 'Favoritos', value: 'favorites', icon: Heart },
          { label: 'Perfil', value: 'profile', icon: User },
        ]
    : [
        { label: 'Home', value: 'home', icon: null },
        { label: 'Sobre', value: 'about', icon: null },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate(isAuthenticated ? (isInstructor ? 'instructor-dashboard' : 'student-dashboard') : 'home')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">AutoEscola Pro</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === item.value
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3">
                  {user.profile_image_url ? (
                    <img
                      src={user.profile_image_url}
                      alt={user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{user.full_name}</span>
                    <span className="text-sm text-gray-500">{isInstructor ? 'Instrutor' : 'Aluno'}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 mb-2">
                {user.profile_image_url ? (
                  <img
                    src={user.profile_image_url}
                    alt={user.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{user.full_name}</span>
                  <span className="text-sm text-gray-500">{isInstructor ? 'Instrutor' : 'Aluno'}</span>
                </div>
              </div>
            )}
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    currentPage === item.value
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </button>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="mx-4 mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
