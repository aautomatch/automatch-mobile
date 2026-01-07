import React from 'react';
import { Car, Star, Shield, Clock, CheckCircle, Users, MapPin, Calendar, Phone, Award, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
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
    { value: '500+', label: 'Alunos Aprovados', icon: Award, color: 'bg-blue-100', textColor: 'text-blue-600' },
    { value: '50+', label: 'Instrutores Certificados', icon: Users, color: 'bg-green-100', textColor: 'text-green-600' },
    { value: '4.8', label: 'Avaliação Média', icon: Star, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
    { value: '10k+', label: 'Aulas Realizadas', icon: TrendingUp, color: 'bg-purple-100', textColor: 'text-purple-600' }
  ];

  const ElegantIllustration = () => (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
      <div className="relative">
        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="relative">
            <Car className="w-32 h-32 text-blue-600" />
            
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-blue-100">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-blue-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-blue-100">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-blue-100">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StepIllustration = ({ step, icon: Icon, color }: { step: number; icon: any; color: string }) => (
    <div className="relative">
      <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
        <span className="text-sm font-bold text-gray-700">{step}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Plataforma 100% segura</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Mais de 500 alunos aprovados</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Avaliação 4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                ⭐ 4.8/5 Avaliações
              </span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                ✅ 95% Aprovação
              </span>
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                🚗 Carro & Moto
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Encontre o <span className="text-[#2E5A88]">Instrutor Perfeito</span> para Suas Aulas de Direção
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Conectamos você aos instrutores mais qualificados da sua região. 
              <span className="block mt-2 font-medium text-gray-900">
                Agende aulas práticas de carro ou moto com total flexibilidade, segurança e acompanhamento personalizado.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('login')}
                aria-label="Criar conta grátis para começar agora"
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-lg"
              >
                <span>Começar Agora Gratuitamente</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <button
                onClick={() => onNavigate('search-instructors')}
                aria-label="Buscar instrutores disponíveis na minha região"
                className="border-2 border-[#2E5A88] text-[#2E5A88] hover:bg-blue-50 px-8 py-4 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 text-lg"
              >
                <MapPin className="w-5 h-5" />
                <span>Ver Instrutores Disponíveis</span>
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">Sem mensalidade</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">Cancelamento grátis</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">Pagamento flexível</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ElegantIllustration />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-10 border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group"
                >
                  <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`w-10 h-10 ${stat.textColor}`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a AutoMatch?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de aprendizado para você conquistar sua habilitação
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600">
              Em apenas 3 passos simples você já pode começar suas aulas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-blue-200 -z-10"></div>
            
            {[
              { step: 1, icon: Users, color: 'bg-blue-500', title: 'Crie sua Conta', desc: 'Cadastre-se gratuitamente em menos de 2 minutos' },
              { step: 2, icon: MapPin, color: 'bg-green-500', title: 'Escolha seu Instrutor', desc: 'Busque e compare instrutores da sua região' },
              { step: 3, icon: Calendar, color: 'bg-orange-500', title: 'Agende sua Aula', desc: 'Escolha data, horário e local de sua preferência' }
            ].map((item) => (
              <div key={item.step} className="text-center group relative">
                <StepIllustration 
                  step={item.step} 
                  icon={item.icon} 
                  color={item.color} 
                />
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Junte-se a milhares de alunos que já conquistaram sua habilitação com a gente
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('login')}
                className="bg-white text-[#2E5A88] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-lg"
              >
                Criar Conta Grátis
              </button>
              
              <button
                onClick={() => onNavigate('search-instructors')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium text-lg"
              >
                Ver Instrutores
              </button>
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
};