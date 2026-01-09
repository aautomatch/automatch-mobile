import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Car, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const logoUrl = new URL('../assets/images/logos/logo.png', import.meta.url).href;

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      onNavigate(email.includes('instrutor') ? 'instructor-dashboard' : 'student-dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (type: 'student' | 'instructor') => {
    if (type === 'student') {
      setEmail('aluno@automatch.com');
      setPassword('senha123');
    } else {
      setEmail('instrutor@automatch.com');
      setPassword('senha123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoUrl}
              alt="AutoMatch Logo" 
              className="h-16 w-auto"  
            />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 mb-3">
            <span className="text-xs font-medium text-gray-700">
              Conectando alunos e instrutores
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600 text-sm">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-500 font-medium mb-2">ACESSO RÁPIDO (DEMO)</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickLogin('student')}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#2E5A88] to-[#2E5A88]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:shadow-md transition-all"
            >
              <span>👨‍🎓</span>
              Aluno Demo
            </button>
            <button
              onClick={() => handleQuickLogin('instructor')}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:shadow-md transition-all"
            >
              <span>👨‍🏫</span>
              Instrutor Demo
            </button>
          </div>
        </div>

        {/* Formulário Principal */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2E5A88]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-3.5 h-3.5 text-[#2E5A88] border-gray-300 rounded focus:ring-2 focus:ring-[#4CAF50]" 
                  />
                  <span className="ml-1.5 text-xs text-gray-600">Lembrar-me</span>
                </label>
                <button 
                  type="button" 
                  className="text-xs font-medium text-[#2E5A88] hover:text-[#4CAF50] hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#2E5A88] text-white py-3 rounded-lg font-medium text-sm shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Carregando...
                </>
              ) : (
                <>
                  <span>Entrar na Conta</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              {'Novo na AutoMatch?'}{' '}
              <button
                onClick={() => onNavigate("register")}
                className="font-medium text-[#2E5A88] hover:text-[#4CAF50]"
              >
                Criar conta gratuita
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            { icon: Shield, text: "Seguro" },
            { icon: CheckCircle, text: "Verificado" },
            { icon: Car, text: "Flexível" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <item.icon className="w-3 h-3 text-[#4CAF50]" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full text-gray-600 hover:text-gray-900 text-xs flex items-center justify-center gap-1.5"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            Voltar para página inicial
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full"></div>
              <span>Plataforma segura • SSL • Dados protegidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};