import React, { useState } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  Star,
  Book,
  Award,
  CheckCircle,
  User,
  Target,
  BarChart3,
  Sparkles,
  GraduationCap,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { mockLessons, mockInstructors, mockReviews } from "../data/mockData";
import { LessonCard } from "../components/LessonCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const upcomingLessons = mockLessons.filter((l) => l.status === "SCHEDULED");
  const completedLessons = mockLessons.filter((l) => l.status === "COMPLETED");
  const totalLessons = mockLessons.length;
  const completedCount = completedLessons.length;
  const totalHours =
    mockLessons.reduce((acc, l) => acc + l.duration_minutes, 0) / 60;

  const progressPercentage = Math.min((totalHours / 20) * 100, 100);
  const nextMilestone =
    progressPercentage >= 50
      ? "Exame Prático"
      : progressPercentage >= 25
      ? "Aulas Noturnas"
      : "Primeiro Estacionamento";

  const stats = [
    {
      icon: Book,
      label: "Aulas Totais",
      value: totalLessons.toString(),
      change: "+2 esta semana",
      color: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border border-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle,
      label: "Concluídas",
      value: completedCount.toString(),
      change: "",
      color: "text-green-600",
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border border-green-100",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      label: "Horas de Prática",
      value: totalHours.toFixed(1) + "h",
      change: "",
      color: "text-purple-600",
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border border-purple-100",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    },
    {
      icon: Star,
      label: "Média de Avaliação",
      value: "5.0",
      change: "+0.2",
      color: "text-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      border: "border border-amber-100",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ];

  const achievements = [
    { icon: Target, label: "Primeira Aula", achieved: true, date: "12/01" },
    {
      icon: Trophy,
      label: "5 Aulas Concluídas",
      achieved: completedCount >= 5,
      date: completedCount >= 5 ? "18/01" : "--/--",
    },
    {
      icon: BarChart3,
      label: "10h de Prática",
      achieved: totalHours >= 10,
      date: totalHours >= 10 ? "22/01" : "--/--",
    },
    { icon: Award, label: "Nota Máxima", achieved: true, date: "15/01" },
  ];

  const recentInstructors = Array.from(
    new Set(mockLessons.map((l) => l.instructor_id))
  )
    .map((id) => mockInstructors.find((i) => i.id === id))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-4 md:py-6">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="relative flex-1">
              <div className="absolute -top-4 -left-2 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#2E5A88]/10 to-[#4CAF50]/10 rounded-full blur-xl"></div>
              <div className="flex items-center gap-3 md:gap-4">
               
                <div className="flex-1 min-w-0">
                  <h1 className="ttext-2xl md:text-3xl font-bold text-gray-900 mb-2 relative truncate">
                    Olá, {user?.full_name?.split(" ")[0]}!
                    <span className="ml-2 md:ml-3">🚗</span>
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 relative truncate">
                    Continue sua jornada rumo à habilitação!
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onNavigate("search-instructors")}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-lg hover:shadow-lg hover:shadow-[#2E5A88]/25 transition-all duration-300 group text-sm md:text-base"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Agendar Nova Aula</span>
                <span className="sm:hidden">Agendar</span>
              </button>
              <button
                onClick={() => onNavigate("my-lessons")}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-[#2E5A88] hover:shadow-md hover:shadow-[#2E5A88]/10 transition-all duration-300 group text-sm md:text-base"
              >
                <Book className="w-4 h-4 group-hover:text-[#2E5A88] transition-colors" />
                <span className="hidden sm:inline">Ver Calendário</span>
                <span className="sm:hidden">Calendário</span>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 md:hidden bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate("search-instructors");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-lg"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Nova Aula
                </button>
                <button
                  onClick={() => {
                    onNavigate("my-lessons");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-200"
                >
                  <Book className="w-4 h-4" />
                  Ver Calendário
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-full shadow-lg shadow-[#2E5A88]/25 text-xs md:text-sm">
              <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">Aluno Ativo</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 text-xs md:text-sm">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#2E5A88]" />
              <span className="text-gray-700 font-medium">
                {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-600 bg-white/50 px-3 py-1.5 md:py-2 rounded-lg">
              Próximo marco:{" "}
              <span className="font-bold text-[#2E5A88]">{nextMilestone}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} ${stat.border} rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 md:hover:-translate-y-2`}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div
                  className={`w-10 h-10 md:w-14 md:h-14 ${stat.iconBg} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                {stat.change && (
                  <span className="text-xs md:text-sm font-bold text-green-600 bg-white/80 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                    ↑ {stat.change}
                  </span>
                )}
              </div>
              <div className="text-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl
 font-bold text-gray-900 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Seu Progresso
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        progressPercentage > 0
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {progressPercentage.toFixed(0)}% das horas obrigatórias
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("progress")}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300 flex items-center gap-2 group self-start sm:self-auto"
                >
                  Ver detalhes
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-1">
                    <span className="font-medium text-gray-700">
                      Aulas Práticas Obrigatórias
                    </span>
                    <span className="font-bold text-gray-900">
                      {totalHours.toFixed(1)}/20 horas
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-[#2E5A88] via-[#4CAF50] to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50/50 to-emerald-50/50 rounded-lg md:rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">
                      Próxima Conquista
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-3">
                    Você está a{" "}
                    <span className="font-bold text-[#2E5A88]">
                      {(20 - totalHours).toFixed(1)}
                    </span>{" "}
                    horas de completar todas as aulas obrigatórias!
                  </p>
                  <div className="text-xs md:text-sm text-gray-600 bg-white/70 px-3 py-2 rounded-lg">
                    💡 <strong>Dica:</strong> Pratique pelo menos 2 horas por
                    semana para concluir mais rápido
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Minhas Aulas
                </h2>
                <button
                  onClick={() => onNavigate("my-lessons")}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-bold transition-colors duration-300 flex items-center gap-2 group self-start sm:self-auto"
                >
                  Ver todas
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-1 mb-6 bg-gray-100/50 rounded-xl p-1">
                <button
                  onClick={() => setSelectedTab("upcoming")}
                  className={`flex-1 py-2 md:py-3 px-3 md:px-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                    selectedTab === "upcoming"
                      ? "bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  <Calendar className="w-4 h-4" /> Agendadas
                  <span className="hidden xs:inline">Próximas</span> ({upcomingLessons.length})
                </button>
                <button
                  onClick={() => setSelectedTab("completed")}
                  className={`flex-1 py-2 md:py-3 px-3 md:px-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                    selectedTab === "completed"
                      ? "bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> Concluídas
                  <span className="hidden xs:inline">Concluídas</span> ({completedLessons.length})
                </button>
              </div>

              <div className="space-y-4">
                {selectedTab === "upcoming" ? (
                  upcomingLessons.length > 0 ? (
                    upcomingLessons.slice(0, 3).map((lesson) => (
                      <div
                        key={lesson.id}
                        className="transform hover:-translate-y-1 transition-transform duration-300"
                      >
                        <LessonCard
                          lesson={lesson}
                          instructor={mockInstructors.find(
                            (i) => i.id === lesson.instructor_id
                          )}
                          onCancel={() =>
                            console.log("Cancel lesson", lesson.id)
                          }
                          onPay={() => console.log("Pay lesson", lesson.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border-2 border-dashed border-gray-300/50">
                      <Calendar className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4 md:mb-6" />
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                        Nenhuma aula agendada! 😊
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-md mx-auto px-2">
                        Você ainda não tem aulas programadas. Que tal agendar
                        sua primeira aula prática?
                      </p>
                      <button
                        onClick={() => onNavigate("search-instructors")}
                        className="bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-xl hover:shadow-xl hover:shadow-[#2E5A88]/30 transition-all duration-300 font-bold text-base md:text-lg"
                      >
                        Agendar Primeira Aula
                      </button>
                    </div>
                  )
                ) : completedLessons.length > 0 ? (
                  completedLessons.slice(0, 3).map((lesson) => (
                    <div
                      key={lesson.id}
                      className="transform hover:-translate-y-1 transition-transform duration-300"
                    >
                      <LessonCard
                        lesson={lesson}
                        instructor={mockInstructors.find(
                          (i) => i.id === lesson.instructor_id
                        )}
                        onReview={() => console.log("Review lesson", lesson.id)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 md:py-12 bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-xl">
                    <Book className="w-12 h-12 md:w-16 md:h-16 text-amber-300 mx-auto mb-3 md:mb-4" />
                    <p className="text-gray-700 font-medium mb-3 md:mb-4 text-sm md:text-base">
                      Você ainda não completou nenhuma aula
                    </p>
                    <button
                      onClick={() => onNavigate("search-instructors")}
                      className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium text-sm md:text-base"
                    >
                      Agendar primeira aula
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2E5A88] to-[#4CAF50] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Suas Conquistas
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Jornada de aprendizado
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white/70 group"
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center ${
                        achievement.achieved
                          ? "bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg"
                          : "bg-gray-100"
                      }`}
                    >
                      <achievement.icon
                        className={`w-4 h-4 md:w-6 md:h-6 ${
                          achievement.achieved ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                        {achievement.label}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full ${
                            achievement.achieved
                              ? "bg-green-100 text-green-800 font-medium"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {achievement.achieved
                            ? "Conquistado"
                            : "Em andamento"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate("achievements")}
                className="w-full mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-3 md:py-4 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl hover:from-gray-100 hover:to-blue-100 transition-all duration-300 font-bold border border-gray-200 text-sm md:text-base"
              >
                <Award className="w-4 h-4 md:w-5 md:h-5" />
                Ver Todas Conquistas
              </button>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  Instrutores Recentes
                </h3>
                <button
                  onClick={() => onNavigate("search-instructors")}
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-bold transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
                >
                  Ver todos
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {recentInstructors.map((instructor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg md:rounded-xl hover:from-gray-100 hover:to-blue-100/50 transition-all duration-300 group hover:shadow-md"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                      <img
                        src={
                          instructor?.profile_image_url ||
                          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                        }
                        alt={instructor?.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm md:text-base truncate">
                        {instructor?.full_name}
                      </p>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-1 md:mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
                          <span className="text-xs md:text-sm font-medium text-gray-700">
                            {instructor?.instructor_details?.average_rating?.toFixed(1) || '5.0'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 md:py-1 rounded">
                          {instructor?.instructor_details?.total_reviews || 0}{" "}
                          avaliações
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  💡 Dica do Dia
                </h3>
              </div>

              <div className="bg-white/80 rounded-lg md:rounded-xl p-3 md:p-4 border border-emerald-100 mb-3 md:mb-4">
                <p className="text-gray-700 italic text-sm md:text-base">
                  "Durante as aulas noturnas, ajuste os retrovisores para evitar
                  o ofuscamento dos faróis dos veículos que vêm atrás."
                </p>
              </div>

              <div className="text-xs md:text-sm text-gray-600">
                <p className="font-medium mb-1 md:mb-2">📚 Leitura Recomendada:</p>
                <a
                  href="#"
                  className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors truncate block"
                >
                  Manual do Condutor – Capítulo 3: Direção Defensiva
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};