import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, Star, Book, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockLessons, mockInstructors, mockReviews } from '../data/mockData';
import { LessonCard } from '../components/LessonCard';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingLessons = mockLessons.filter(l => l.status === 'SCHEDULED');
  const completedLessons = mockLessons.filter(l => l.status === 'COMPLETED');
  const totalLessons = mockLessons.length;
  const completedCount = completedLessons.length;
  const totalHours = mockLessons.reduce((acc, l) => acc + l.duration_minutes, 0) / 60;

  const stats = [
    {
      icon: Book,
      label: 'Aulas Totais',
      value: totalLessons.toString(),
      color: 'blue'
    },
    {
      icon: CheckCircle,
      label: 'Concluídas',
      value: completedCount.toString(),
      color: 'green'
    },
    {
      icon: Clock,
      label: 'Horas de Prática',
      value: totalHours.toFixed(1),
      color: 'purple'
    },
    {
      icon: Star,
      label: 'Média de Avaliação',
      value: '5.0',
      color: 'yellow'
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
                src={user?.profile_image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                alt={user?.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Olá, {user?.full_name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-blue-100">
                Continue praticando para conquistar sua habilitação!
              </p>
            </div>
            <button
              onClick={() => onNavigate('search-instructors')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium self-start md:self-auto"
            >
              Agendar Nova Aula
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-5">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Seu Progresso</h2>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">Aulas Práticas Obrigatórias</span>
            <span className="font-medium text-gray-900">{totalHours.toFixed(0)}/20 horas</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalHours / 20) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Você já completou {((totalHours / 20) * 100).toFixed(0)}% das aulas obrigatórias. Continue assim!
          </p>
        </div>

        {/* Lessons Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Minhas Aulas</h2>
            <button
              onClick={() => onNavigate('my-lessons')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                selectedTab === 'upcoming'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Próximas ({upcomingLessons.length})
              {selectedTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                selectedTab === 'completed'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Concluídas ({completedLessons.length})
              {selectedTab === 'completed' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {selectedTab === 'upcoming' ? (
              upcomingLessons.length > 0 ? (
                upcomingLessons.slice(0, 3).map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    instructor={mockInstructors.find(i => i.id === lesson.instructor_id)}
                    onCancel={() => console.log('Cancel lesson', lesson.id)}
                    onPay={() => console.log('Pay lesson', lesson.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Você não tem aulas agendadas</p>
                  <button
                    onClick={() => onNavigate('search-instructors')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agendar Primeira Aula
                  </button>
                </div>
              )
            ) : (
              completedLessons.length > 0 ? (
                completedLessons.slice(0, 3).map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    instructor={mockInstructors.find(i => i.id === lesson.instructor_id)}
                    onReview={() => console.log('Review lesson', lesson.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Você ainda não completou nenhuma aula</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing import
import { CheckCircle } from 'lucide-react';
