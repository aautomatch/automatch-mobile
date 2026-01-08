import React from 'react';
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  Car,
  CheckCircle,
  MessageSquare,
  Settings
} from 'lucide-react';
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
    { icon: DollarSign, label: 'Ganhos do mês', value: `R$ ${monthlyEarnings.toFixed(2)}` },
    { icon: Users, label: 'Alunos ativos', value: totalStudents.toString() },
    { icon: Calendar, label: 'Aulas agendadas', value: upcomingLessons.length.toString() },
    { icon: Star, label: 'Avaliação média', value: avgRating.toFixed(1) }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">

      <div className="bg-gradient-to-r from-[#4A7FB8] to-[#3A6CA1] py-4">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={instructor.profile_image_url}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Olá, {instructor.full_name}</h1>
              <p className="text-white/80 text-sm">
                {todayLessons.length} aulas hoje
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <stat.icon className="w-6 h-6 text-gray-400 mb-4" />
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Agenda de Hoje</h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
                <button onClick={() => onNavigate('lessons')} className="text-sm text-[#2E5A88] font-medium">
                  Ver todas →
                </button>
              </div>

              {todayLessons.length ? (
                <div className="space-y-5">
                  {todayLessons.map(lesson => (
                    <div key={lesson.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="flex-1 w-px bg-gray-200" />
                      </div>

                      <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold">
                            {format(new Date(lesson.scheduled_at), 'HH:mm')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {lesson.duration_minutes} min
                          </span>
                        </div>

                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> Aula prática
                          </span>
                          <span className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            {mockVehicles.find(v => v.id === lesson.vehicle_id)?.license_plate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Nenhuma aula hoje 🚗💤
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Próximas Aulas</h2>
              {upcomingLessons.length ? (
                <div className="space-y-4">
                  {upcomingLessons.slice(0, 3).map(lesson => (
                    <LessonCard key={lesson.id} lesson={lesson} showInstructor={false} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">Nenhuma aula agendada</p>
              )}
            </div>
          </div>

          <div className="space-y-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-5">
                Resumo do mês
              </h3>

              <SummaryItem label="Aulas concluídas" value={completedThisMonth.length} />
              <SummaryItem
                label="Horas trabalhadas"
                value={`${(completedThisMonth.reduce((a, l) => a + l.duration_minutes, 0) / 60).toFixed(1)}h`}
              />
              <SummaryItem label="Taxa de aprovação" value="95%" green />
              <SummaryItem
                label="Avaliação média"
                value={
                  <span className="flex items-center gap-1">
                    {avgRating.toFixed(1)}
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </span>
                }
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <ActionButton label="Nova aula" icon={Calendar} />
              <ActionButton label="Atualizar horários" icon={Clock} green />
              <ActionButton label="Configurações" icon={Settings} purple />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value, green }: any) => (
  <div className="flex justify-between py-3 border-b last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className={`font-semibold ${green ? 'text-green-600' : ''}`}>
      {value}
    </span>
  </div>
);

const ActionButton = ({ label, icon: Icon, green, purple }: any) => {
  const color = green
    ? 'from-green-500 to-green-600'
    : purple
    ? 'from-purple-500 to-purple-600'
    : 'from-blue-500 to-blue-600';

  return (
    <button className={`w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${color} text-white shadow hover:shadow-lg transition`}>
      <span className="font-semibold">{label}</span>
      <Icon className="w-5 h-5" />
    </button>
  );
};
