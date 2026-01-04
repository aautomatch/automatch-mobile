import React, { useState } from 'react';
import { Users, GraduationCap, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const DemoSwitcher: React.FC = () => {
  const { user, isInstructor, switchToInstructor, switchToStudent } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title="Demo Switcher"
      >
        {isInstructor ? <GraduationCap className="w-6 h-6" /> : <Users className="w-6 h-6" />}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Demo Mode</h2>
            <p className="text-gray-600 mb-6">
              Alterne entre as visualizações de Aluno e Instrutor para explorar todas as funcionalidades.
            </p>

            <div className="space-y-4">
              {/* Student Mode */}
              <button
                onClick={() => {
                  switchToStudent();
                  setIsOpen(false);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  !isInstructor
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    !isInstructor ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Modo Aluno</h3>
                    <p className="text-sm text-gray-600">
                      Buscar instrutores, agendar aulas e acompanhar progresso
                    </p>
                  </div>
                  {!isInstructor && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {/* Instructor Mode */}
              <button
                onClick={() => {
                  switchToInstructor();
                  setIsOpen(false);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isInstructor
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isInstructor ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Modo Instrutor</h3>
                    <p className="text-sm text-gray-600">
                      Gerenciar agenda, veículos e visualizar estatísticas
                    </p>
                  </div>
                  {isInstructor && (
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 <strong>Dica:</strong> Esta funcionalidade é apenas para demonstração. 
                Em produção, cada usuário teria apenas uma visualização.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
