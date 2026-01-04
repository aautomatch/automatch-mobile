import React, { useState } from 'react';
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star } from 'lucide-react';
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
  const instructor = mockInstructors[0]; // Mock instructor data

  // Mock lessons for instructor
  const instructorLessons = mockLessons.filter(l => l.instructor_id === instructor.id);
  const todayLessons = instructorLessons.filter(l => {
    const lessonDate = new Date(l.scheduled_at);
    const today = new Date();
    return lessonDate.toDateString() === today.toDateString();
  });

  const upcomingLessons = instructorLessons.filter(l => l.status === 'SCHEDULED');
  const completedThisMonth = instructorLessons.filter(l => {
    const lessonDate = new Date(l.created_at);
    const now = new Date();
    return l.status === 'COMPLETED' && 
           lessonDate.getMonth() === now.getMonth() &&
           lessonDate.getFullYear() === now.getFullYear();
  });

  const monthlyEarnings = completedThisMonth.reduce((acc, l) => acc + l.price, 0);
  const totalStudents = new Set(instructorLessons.map(l => l.student_id)).size;
  const avgRating = instructor.instructor_details.average_rating;

  const stats = [
    {
      icon: DollarSign,
      label: 'Ganhos do Mês',
      value: `R$ ${monthlyEarnings.toFixed(2)}`,
      color: 'green',
      trend: '+12%'
    },
    {
      icon: Users,
      label: 'Alunos Ativos',
      value: totalStudents.toString(),
      color: 'blue',
      trend: '+3'
    },
    {
      icon: Calendar,
      label: 'Aulas Agendadas',
      value: upcomingLessons.length.toString(),
      color: 'purple',
      trend: ''
    },
    {
      icon: Star,
      label: 'Avaliação Média',
      value: avgRating.toFixed(1),
      color: 'yellow',
      trend: ''
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={instructor.profile_image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
                alt={instructor.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bem-vindo, {instructor.full_name}! 👋
              </h1>
              <p className="text-blue-100">
                Você tem {todayLessons.length} {todayLessons.length === 1 ? 'aula agendada' : 'aulas agendadas'} para hoje
              </p>
            </div>
            <button
              onClick={() => onNavigate('vehicles')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium self-start md:self-auto"
            >
              Gerenciar Veículos
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                {stat.trend && (
                  <span className="text-green-600 text-sm font-medium">{stat.trend}</span>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Agenda de Hoje</h2>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todas
                </button>
              </div>

              {todayLessons.length > 0 ? (
                <div className="space-y-4">
                  {todayLessons.map((lesson) => (
                    <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {format(new Date(lesson.scheduled_at), 'HH:mm')}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {lesson.duration_minutes} min
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Aluno: {lesson.student_id}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Veículo: {mockVehicles.find(v => v.id === lesson.vehicle_id)?.license_plate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Nenhuma aula agendada para hoje</p>
                </div>
              )}
            </div>

            {/* Upcoming Lessons */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Próximas Aulas</h2>
              {upcomingLessons.length > 0 ? (
                <div className="space-y-4">
                  {upcomingLessons.slice(0, 3).map((lesson) => (
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resumo do Mês</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Aulas Completadas</span>
                  <span className="font-semibold text-gray-900">{completedThisMonth.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Horas Trabalhadas</span>
                  <span className="font-semibold text-gray-900">
                    {(completedThisMonth.reduce((acc, l) => acc + l.duration_minutes, 0) / 60).toFixed(1)}h
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taxa de Aprovação</span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
              </div>
            </div>

            {/* Vehicles */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Meus Veículos</h3>
                <button
                  onClick={() => onNavigate('vehicles')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todos
                </button>
              </div>
              <div className="space-y-3">
                {mockVehicles.slice(0, 2).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-gray-600">{vehicle.license_plate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Avaliações Recentes</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    "Excelente instrutor! Muito paciente."
                  </p>
                  <p className="text-xs text-gray-500">João Silva - há 2 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
