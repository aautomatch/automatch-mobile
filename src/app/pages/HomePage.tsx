import React from 'react';
import {
  Users,
  Shield,
  Clock,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
      title: 'Instrutores Verificados',
      description: 'Instrutores avaliados e verificados pela plataforma.',
    },
    {
      icon: Clock,
      title: 'Horários Flexíveis',
      description: 'Agende aulas quando quiser, sem burocracia.',
    },
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Pague direto pela plataforma com total segurança.',
    },
    {
      icon: Star,
      title: 'Avaliações Reais',
      description: 'Veja notas e comentários de outros alunos.',
    },
  ];

  const stats = [
    { label: 'Alunos Atendidos', value: '500+' },
    { label: 'Instrutores Ativos', value: '50+' },
    { label: 'Avaliação Média', value: '4.8 ⭐' },
    { label: 'Aulas Realizadas', value: '10k+' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      <section className="container mx-auto px-4 py-20">
  <div className="grid md:grid-cols-2 gap-16 items-center">

    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Aprenda a dirigir com
        <span className="block bg-gradient-to-r from-[#4CAF50] to-[#2E5A88] bg-clip-text text-transparent">
          instrutores independentes
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Escolha quem vai te ensinar, quando e onde quiser.
        <span className="block mt-1 font-medium text-gray-800">
          Sem autoescola. Sem burocracia.
        </span>
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
        {['Sem mensalidade', 'Instrutores verificados', 'Pagamento seguro', 'Suporte 24/7'].map(
          (item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {item}
            </div>
          )
        )}
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 text-lg">
        Encontre um instrutor agora
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            placeholder="Sua cidade ou bairro"
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none"
          />
        </div>

        <select className="w-full px-4 py-4 border border-gray-300 rounded-xl">
          <option>Carro</option>
          <option>Moto</option>
        </select>

        <button
          onClick={() => onNavigate('search-instructors')}
          className="w-full bg-gradient-to-r from-[#4CAF50] to-[#2E5A88] text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition"
        >
          Buscar instrutores
        </button>
      </div>
    </div>
  </div>
</section>
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl border border-gray-100 p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Por que escolher a AutoMatch?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Uma nova forma de aprender a dirigir, com liberdade e transparência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <feature.icon className="w-8 h-8 text-[#2E5A88] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Como funciona
            </h2>
            <p className="mt-4 text-gray-600">
              Comece suas aulas em poucos passos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: 'Crie sua conta',
                desc: 'Cadastro gratuito e rápido.',
              },
              {
                icon: MapPin,
                title: 'Escolha o instrutor',
                desc: 'Compare preços, avaliações e localização.',
              },
              {
                icon: Calendar,
                title: 'Agende a aula',
                desc: 'Defina data, horário e local.',
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#4CAF50] to-[#2E5A88] flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
