import React from 'react';
import { Calendar, DollarSign, Users, Clock, Star, Car, MessageSquare, MapPin, Award, TrendingUp, FileText, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockLessons, mockInstructors, mockVehicles } from '../data/mockData';
import { LessonCard } from '../components/LessonCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const instructor = mockInstructors[0];

  const instructorLessons = mockLessons.filter(l => l.instructor_id === instructor.id);
  const todayLessons = instructorLessons.filter(l => {
    const today = new Date().toDateString();
    return new Date(l.scheduled_at).toDateString() === today;
  });

  const upcomingLessons = instructorLessons.filter(l => l.status === 'SCHEDULED');
  const completedThisMonth = instructorLessons.filter(l => {
    const d = new Date(l.created_at);
    const now = new Date();
    return (
      l.status === 'COMPLETED' &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const monthlyEarnings = completedThisMonth.reduce((acc, l) => acc + l.price, 0);
  const totalStudents = new Set(instructorLessons.map(l => l.student_id)).size;
  const avgRating = instructor.instructor_details.average_rating;

  const stats = [
    { icon: DollarSign, label: 'Ganhos do mês', value: `R$ ${monthlyEarnings.toFixed(2)}`, change: '+12%', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Users, label: 'Alunos ativos', value: totalStudents.toString(), change: '+3', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Calendar, label: 'Aulas agendadas', value: upcomingLessons.length.toString(), change: '', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Star, label: 'Avaliação média', value: avgRating.toFixed(1), change: '', color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const vehicles = mockVehicles.slice(0, 3);

  const recentReviews = [
    { name: 'João Silva', rating: 5, comment: 'Excelente instrutor, muito paciente!', date: 'há 2 dias' },
    { name: 'Maria Santos', rating: 4, comment: 'Aprendi muito rápido com suas dicas.', date: 'há 5 dias' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta, {instructor.full_name.split(' ')[0]}! 👨‍🏫
              </h1>
              <p className="text-gray-600">
                Aqui está seu resumo de atividades e desempenho
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onNavigate('lessons')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-[#2E5A88] hover:text-[#2E5A88] transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Nova Aula
              </button>
              <button
                onClick={() => onNavigate('vehicles')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-[#2E5A88] hover:text-[#2E5A88] transition-all duration-300"
              >
                <Car className="w-4 h-4" />
                Adicionar Veículo
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Instrutor Verificado</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.change && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Agenda de Hoje</h2>
                  <p className="text-gray-600">
                    {todayLessons.length} {todayLessons.length === 1 ? 'aula agendada' : 'aulas agendadas'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300 flex items-center gap-2"
                >
                  Ver calendário completo
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>

              {todayLessons.length > 0 ? (
                <div className="space-y-4">
                  {todayLessons.map(lesson => (
                    <div key={lesson.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600">
                              {format(new Date(lesson.scheduled_at), 'HH')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Aula #{lesson.id}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(lesson.scheduled_at), 'HH:mm')} • {lesson.duration_minutes} min
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lesson.status === 'SCHEDULED' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lesson.status === 'SCHEDULED' ? 'Confirmada' : 'Pendente'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>Aluno #{lesson.student_id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-400" />
                          <span>{mockVehicles.find(v => v.id === lesson.vehicle_id)?.license_plate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">R$ {lesson.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-dashed border-gray-300">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Dia tranquilo! 😊</h3>
                  <p className="text-gray-600 mb-6">Nenhuma aula agendada para hoje</p>
                  <button
                    onClick={() => onNavigate('lessons')}
                    className="bg-[#2E5A88] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A5F] transition-colors duration-300 font-medium"
                  >
                    Agendar Nova Aula
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Próximas Aulas</h2>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300"
                >
                  Ver todas →
                </button>
              </div>
              {upcomingLessons.length > 0 ? (
                <div className="space-y-4">
                  {upcomingLessons.slice(0, 4).map(lesson => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      showInstructor={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Nenhuma aula agendada</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-[#2E5A88]" />
                <h3 className="text-lg font-bold text-gray-900">Resumo do Mês</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { icon: Calendar, label: 'Aulas Completadas', value: completedThisMonth.length },
                  { icon: Clock, label: 'Horas Trabalhadas', value: `${(completedThisMonth.reduce((a, l) => a + l.duration_minutes, 0) / 60).toFixed(1)}h` },
                  { icon: Users, label: 'Novos Alunos', value: '+5', color: 'text-green-600' },
                  { icon: Star, label: 'Avaliação Média', value: avgRating.toFixed(1) }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className={`font-bold ${item.color || 'text-gray-900'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => onNavigate('reports')}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium"
              >
                <FileText className="w-4 h-4" />
                Ver Relatório Completo
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Meus Veículos</h3>
                <button
                  onClick={() => onNavigate('vehicles')}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300"
                >
                  Ver todos →
                </button>
              </div>
              
              <div className="space-y-4">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      vehicle.is_available ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Car className={`w-6 h-6 ${
                        vehicle.is_available ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{vehicle.brand} {vehicle.model}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">{vehicle.license_plate}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          vehicle.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.is_available ? 'Disponível' : 'Em uso'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avaliações Recentes */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Avaliações Recentes</h3>
              
              <div className="space-y-5">
                {recentReviews.map((review, idx) => (
                  <div key={idx} className="border-l-4 border-amber-400 pl-4 py-2">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic mb-2">"{review.comment}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{review.name}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 text-center text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300">
                Ver todas as avaliações →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};