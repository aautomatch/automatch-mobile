import React from 'react';
import { Car, Star, Shield, Clock, CheckCircle, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Star,
      title: 'Instrutores Qualificados',
      description: 'Todos os nossos instrutores são verificados e avaliados pelos alunos'
    },
    {
      icon: Clock,
      title: 'Horários Flexíveis',
      description: 'Agende suas aulas nos horários que melhor se adequam à sua rotina'
    },
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Múltiplas formas de pagamento com total segurança'
    },
    {
      icon: Car,
      title: 'Veículos Modernos',
      description: 'Frota atualizada com controles duplos e ar condicionado'
    }
  ];

  const stats = [
    { value: '500+', label: 'Alunos Aprovados' },
    { value: '50+', label: 'Instrutores' },
    { value: '4.8', label: 'Avaliação Média' },
    { value: '10k+', label: 'Aulas Realizadas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Aprenda a Dirigir com os Melhores Instrutores
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Conectamos você aos instrutores mais qualificados da sua região. 
              Agende suas aulas de forma prática e segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Começar Agora
              </button>
              <button
                onClick={() => onNavigate('search-instructors')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Buscar Instrutores
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800"
              alt="Aprendendo a dirigir"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">95% de Aprovação</p>
                  <p className="text-sm text-gray-600">nos exames práticos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a AutoEscola Pro?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de aprendizado para você conquistar sua habilitação
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600">
              Em apenas 3 passos simples você já pode começar suas aulas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Crie sua Conta</h3>
              <p className="text-gray-600">Cadastre-se gratuitamente em menos de 2 minutos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Escolha seu Instrutor</h3>
              <p className="text-gray-600">Busque e compare instrutores da sua região</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Agende sua Aula</h3>
              <p className="text-gray-600">Escolha data, horário e local de sua preferência</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Junte-se a milhares de alunos que já conquistaram sua habilitação com a gente
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Criar Conta Grátis
          </button>
        </div>
      </section>
    </div>
  );
};
