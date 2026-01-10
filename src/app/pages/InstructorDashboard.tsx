import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  Car,
  MessageSquare,
  MapPin,
  Award,
  TrendingUp,
  FileText,
  Shield,
  Sparkles,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { mockLessons, mockInstructors, mockVehicles } from "../data/mockData";
import { LessonCard } from "../components/LessonCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AvailabilityModal } from "../components/IntructorDashboard/AvailabilityModal";
import { LessonsModal } from "../components/IntructorDashboard/LessonsModal";
import { MonthSummaryModal } from "../components/IntructorDashboard/MonthSummaryModal";
import { InstructorReviewsPage } from "../pages/InstructorReviewsPage";

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const instructor = mockInstructors[0];
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const instructorLessons = mockLessons.filter(
    (l) => l.instructor_id === instructor.id
  );
  const todayLessons = instructorLessons.filter((l) => {
    const today = new Date().toDateString();
    return new Date(l.scheduled_at).toDateString() === today;
  });

  const upcomingLessons = instructorLessons.filter(
    (l) => l.status === "SCHEDULED"
  );
  const completedThisMonth = instructorLessons.filter((l) => {
    const d = new Date(l.created_at);
    const now = new Date();
    return (
      l.status === "COMPLETED" &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const monthlyEarnings = completedThisMonth.reduce(
    (acc, l) => acc + l.price,
    0
  );
  const totalStudents = new Set(instructorLessons.map((l) => l.student_id))
    .size;
  const avgRating = instructor.instructor_details.average_rating;
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: "1", day_of_week: 1, start_time: "08:00", end_time: "12:00" },
    { id: "2", day_of_week: 1, start_time: "14:00", end_time: "18:00" },
    { id: "3", day_of_week: 3, start_time: "09:00", end_time: "17:00" },
  ]);
  const handleSaveAvailability = (slots: any[]) => {
    setAvailabilitySlots(slots);
    console.log("Salvando disponibilidade:", slots);
  };
  const stats = [
    {
      icon: DollarSign,
      label: "Ganhos do mês",
      value: `R$ ${monthlyEarnings.toFixed(2)}`,
      change: "+12%",
      color: "text-green-600",
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border border-green-100",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      label: "Alunos ativos",
      value: totalStudents.toString(),
      change: "+3",
      color: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border border-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      label: "Aulas agendadas",
      value: upcomingLessons.length.toString(),
      change: "",
      color: "text-purple-600",
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border border-purple-100",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    },
    {
      icon: Star,
      label: "Avaliação média",
      value: avgRating.toFixed(1),
      change: "",
      color: "text-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      border: "border border-amber-100",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ];

  const vehicles = mockVehicles.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [weeklyLessons, setWeeklyLessons] = useState<any[]>([]);
  const recentReviews = [
    {
      name: "João Silva",
      rating: 5,
      comment: "Excelente instrutor, muito paciente!",
      date: "há 2 dias",
    },
    {
      name: "Maria Santos",
      rating: 4,
      comment: "Aprendi muito rápido com suas dicas.",
      date: "há 5 dias",
    },
  ];
  const [isMonthSummaryModalOpen, setIsMonthSummaryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="relative">
              <div className="absolute -top-6 -left-2 w-24 h-24 bg-gradient-to-r from-[#2E5A88]/10 to-[#4CAF50]/10 rounded-full blur-xl"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 relative">
                Olá, {instructor.full_name.split(" ")[0]}!
                <span className="ml-3">👨‍🏫</span>
              </h1>
              <p className="text-gray-600 relative">
                Aqui está seu resumo de atividades e desempenho
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAvailabilityModal(true)}
                    className="md:hidden p-3 rounded-lg border border-gray-200"
                  >
                    <Clock className="w-5 h-5 text-[#4CAF50]" />
                  </button>

                  <button
                    onClick={() => setShowAvailabilityModal(true)}
                    className="hidden md:flex items-center gap-2 px-4 py-2.5
                      bg-gradient-to-r from-gray-50 to-blue-50
                      text-gray-800 rounded-lg border border-gray-200
                      hover:border-[#4CAF50] hover:from-gray-100 hover:to-blue-100
                      transition-all duration-300 group"
                  >
                    <Clock className="w-4 h-4 text-[#4CAF50] group-hover:scale-110 transition-transform" />
                    Disponibilidade
                  </button>
                </div>

                <AvailabilityModal
                  isOpen={showAvailabilityModal}
                  onClose={() => setShowAvailabilityModal(false)}
                  onSave={handleSaveAvailability}
                  existingSlots={availabilitySlots}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-full shadow-lg shadow-[#2E5A88]/25">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Instrutor Verificado</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50">
              <Clock className="w-4 h-4 text-[#2E5A88]" />
              <span className="text-sm text-gray-700 font-medium">
                {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} ${stat.border} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2`}
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                {stat.change && (
                  <span className="text-sm font-bold text-green-600 bg-white/80 px-3 py-1 rounded-full">
                    ↑ {stat.change}
                  </span>
                )}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Agenda de Hoje
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        todayLessons.length > 0
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {todayLessons.length}{" "}
                    {todayLessons.length === 1
                      ? "aula agendada"
                      : "aulas agendadas"}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("lessons")}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300 flex items-center gap-2 group"
                >
                  Ver calendário completo
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {todayLessons.length > 0 ? (
                <div className="space-y-4">
                  {todayLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-xl p-5 hover:border-[#2E5A88]/50 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold text-white">
                              {format(new Date(lesson.scheduled_at), "HH")}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              Aula #{lesson.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(lesson.scheduled_at), "HH:mm")} •{" "}
                              {lesson.duration_minutes} min
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            lesson.status === "SCHEDULED"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {lesson.status === "SCHEDULED"
                            ? "Confirmada"
                            : "Pendente"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-3">
                          <Users className="w-4 h-4 text-[#2E5A88]" />
                          <span className="font-medium">
                            Aluno #{lesson.student_id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-3">
                          <Car className="w-4 h-4 text-[#2E5A88]" />
                          <span className="font-medium">
                            {
                              mockVehicles.find(
                                (v) => v.id === lesson.vehicle_id
                              )?.license_plate
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-700">
                            R$ {lesson.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border-2 border-dashed border-gray-300/50">
                  <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Dia tranquilo! 😊
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Nenhuma aula agendada para hoje
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Aulas de Amanhã
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    {format(
                      new Date(Date.now() + 86400000),
                      "EEEE, d 'de' MMMM",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300 flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  Ver semana completa
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <LessonsModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>

              {(() => {
                const isTomorrow = (dateString: string) => {
                  const today = new Date();
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);

                  const lessonDate = new Date(dateString);

                  return (
                    lessonDate.getDate() === tomorrow.getDate() &&
                    lessonDate.getMonth() === tomorrow.getMonth() &&
                    lessonDate.getFullYear() === tomorrow.getFullYear()
                  );
                };

                const tomorrowLessons = upcomingLessons.filter((lesson) =>
                  isTomorrow(lesson.scheduled_at)
                );

                return (
                  <>
                    {tomorrowLessons.length > 0 ? (
                      <div className="space-y-4">
                        {tomorrowLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="transform hover:-translate-y-1 transition-transform duration-300"
                          >
                            <LessonCard
                              lesson={lesson}
                              showInstructor={false}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="relative mb-6">
                          <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
                          <Calendar className="w-16 h-16 text-blue-300 mx-auto relative" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Dia tranquilo amanhã! 🌅
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Nenhuma aula agendada para{" "}
                          {format(new Date(Date.now() + 86400000), "EEEE", {
                            locale: ptBR,
                          })}
                          .
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2E5A88] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Resumo do Mês
                  </h3>
                  <p className="text-sm text-gray-600">Desempenho geral</p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: Calendar,
                    label: "Aulas Completadas",
                    value: completedThisMonth.length,
                    color: "text-blue-600",
                  },
                  {
                    icon: Clock,
                    label: "Horas Trabalhadas",
                    value: `${(
                      completedThisMonth.reduce(
                        (a, l) => a + l.duration_minutes,
                        0
                      ) / 60
                    ).toFixed(1)}h`,
                    color: "text-purple-600",
                  },
                  {
                    icon: Users,
                    label: "Novos Alunos",
                    value: "+5",
                    color: "text-green-600",
                  },
                  {
                    icon: Star,
                    label: "Avaliação Média",
                    value: avgRating.toFixed(1),
                    color: "text-amber-600",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-white/50 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className={`font-bold text-xl ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsMonthSummaryModalOpen(true)}
                className="w-full mt-8 flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl hover:from-gray-100 hover:to-blue-100 transition-all duration-300 font-bold border border-gray-200 group"
              >
                <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver Resumo Detalhado
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <MonthSummaryModal
              isOpen={isMonthSummaryModalOpen}
              onClose={() => setIsMonthSummaryModalOpen(false)}
              onNavigateToReports={() => onNavigate("reports")}
              metrics={{
                completedLessons: completedThisMonth.length,
                totalHours: parseFloat(
                  (
                    completedThisMonth.reduce(
                      (a, l) => a + l.duration_minutes,
                      0
                    ) / 60
                  ).toFixed(1)
                ),
                newStudents: 5,
                averageRating: avgRating,
                monthlyEarnings: monthlyEarnings,
                totalStudents: totalStudents,
                scheduledLessons: upcomingLessons.length,
                cancellationRate: 8.3,
              }}
            />
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Meus Veículos
                </h3>
                <button
                  onClick={() => onNavigate("vehicles")}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-bold transition-colors duration-300 flex items-center gap-2 group"
                >
                  Ver todos
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl hover:from-gray-100 hover:to-blue-100/50 transition-all duration-300 group hover:shadow-md"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        vehicle.is_available
                          ? "bg-gradient-to-br from-green-500 to-emerald-500"
                          : "bg-gradient-to-br from-amber-500 to-orange-500"
                      }`}
                    >
                      <Car className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-lg">
                          {vehicle.license_plate}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                            vehicle.is_available
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800"
                          }`}
                        >
                          {vehicle.is_available ? "Disponível" : "Em uso"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                ⭐ Avaliações Recentes
              </h3>

              <div className="space-y-6">
                {recentReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 rounded-xl p-4 border border-amber-100 hover:border-amber-200 transition-colors"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                      <span className="font-bold text-gray-900">
                        {review.name}
                      </span>
                      <span className="text-sm text-gray-500 bg-amber-50 px-3 py-1 rounded-full">
                        {review.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate("reviews")} 
                className="w-full mt-8 text-center text-[#2E5A88] hover:text-[#1E3A5F] font-bold transition-colors duration-300 group"
              >
                Ver todas as avaliações
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
