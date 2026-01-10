import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Calendar as CalendarIcon,
  ArrowLeft,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

import { mockLessons, mockInstructors, mockVehicles } from "../data/mockData";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { MobileCalendar } from "../components/IntructorDashboard/MobileCalendar";

interface InstructorCalendarPageProps {
  onNavigate: (page: string) => void;
}

export const InstructorCalendarPage: React.FC<InstructorCalendarPageProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const instructor = mockInstructors[0];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [showFilters, setShowFilters] = useState(false);

  const instructorLessons = mockLessons.filter(
    (l) => l.instructor_id === instructor.id
  );

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const lessonsByDate: Record<string, any[]> = {};
  instructorLessons.forEach((lesson) => {
    const dateKey = format(parseISO(lesson.scheduled_at), "yyyy-MM-dd");
    if (!lessonsByDate[dateKey]) {
      lessonsByDate[dateKey] = [];
    }
    lessonsByDate[dateKey].push(lesson);
  });

  const selectedDayLessons = selectedDate
    ? lessonsByDate[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  const currentMonthLessons = instructorLessons.filter((lesson) => {
    const lessonDate = parseISO(lesson.scheduled_at);
    return (
      lessonDate.getMonth() === currentDate.getMonth() &&
      lessonDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const completedThisMonth = currentMonthLessons.filter(
    (l) => l.status === "COMPLETED"
  ).length;
  const scheduledThisMonth = currentMonthLessons.filter(
    (l) => l.status === "SCHEDULED"
  ).length;
  const cancelledThisMonth = currentMonthLessons.filter(
    (l) => l.status === "CANCELLED"
  ).length;

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Clock,
        };
      case "COMPLETED":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
        };
      case "CANCELLED":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: AlertCircle,
        };
    }
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          monthDays={monthDays}
          lessonsByDate={lessonsByDate}
          setSelectedDate={setSelectedDate}
          goToPreviousMonth={() => setCurrentDate((prev) => subMonths(prev, 1))}
          goToNextMonth={() => setCurrentDate((prev) => addMonths(prev, 1))}
          goToToday={goToToday}
          onNavigate={onNavigate}
        />
      </div>
      <div className="hidden md:block min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate("instructor-dashboard")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <CalendarIcon className="w-8 h-8 text-blue-600" />
                    Calendário de Aulas
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Visualize e gerencie todas as suas aulas agendadas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto">
                  <button
                    onClick={() => setViewMode("month")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      viewMode === "month"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Mês
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      viewMode === "week"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Semana
                  </button>
                  <button
                    onClick={() => setViewMode("day")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      viewMode === "day"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Dia
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                    showFilters
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              </div>
            </div>
            {showFilters && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Filtrar Aulas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Agendadas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Concluídas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Canceladas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Este Mês</span>
                  </label>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
                  </h2>

                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-lg font-medium hover:from-gray-100 hover:to-blue-100 transition-all"
                  >
                    Hoje
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Concluídas: {completedThisMonth}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Agendadas: {scheduledThisMonth}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Canceladas: {cancelledThisMonth}
                    </span>
                  </div>
                </div>
              </div>

              {viewMode === "month" && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day, index) => (
                      <div
                        key={index}
                        className="text-center font-medium text-gray-600 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: monthStart.getDay() }).map(
                      (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="h-32 bg-gray-50/50 rounded-lg"
                        ></div>
                      )
                    )}

                    {monthDays.map((day, index) => {
                      const dateKey = format(day, "yyyy-MM-dd");
                      const dayLessons = lessonsByDate[dateKey] || [];
                      const isToday = isSameDay(day, new Date());
                      const isSelected =
                        selectedDate && isSameDay(day, selectedDate);

                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDate(day)}
                          className={`h-32 rounded-lg border transition-all cursor-pointer hover:border-blue-300 hover:shadow-sm ${
                            isSelected
                              ? "border-blue-500 bg-blue-50/50"
                              : isToday
                              ? "border-blue-300 bg-blue-50/30"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={`font-medium ${
                                  isToday
                                    ? "text-blue-600"
                                    : isSameMonth(day, currentDate)
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {format(day, "d")}
                              </span>
                              {dayLessons.length > 0 && (
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {dayLessons.length}
                                </span>
                              )}
                            </div>

                            <div className="space-y-1 max-h-20 overflow-y-auto">
                              {dayLessons.slice(0, 3).map((lesson, idx) => {
                                const statusConfig = getStatusConfig(
                                  lesson.status
                                );
                                const StatusIcon = statusConfig.icon;

                                return (
                                  <div
                                    key={idx}
                                    className={`text-xs px-2 py-1 rounded border ${statusConfig.color} truncate`}
                                    title={`${format(
                                      parseISO(lesson.scheduled_at),
                                      "HH:mm"
                                    )} - Aluno #${lesson.student_id}`}
                                  >
                                    <div className="flex items-center gap-1">
                                      <StatusIcon className="w-3 h-3" />
                                      <span>
                                        {format(
                                          parseISO(lesson.scheduled_at),
                                          "HH:mm"
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                              {dayLessons.length > 3 && (
                                <div className="text-xs text-gray-500 text-center">
                                  +{dayLessons.length - 3} mais
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedDate
                      ? format(selectedDate, "EEEE, d 'de' MMMM", {
                          locale: ptBR,
                        })
                      : "Selecione um dia"}
                  </h2>
                  <span className="text-gray-600">
                    {selectedDayLessons.length}{" "}
                    {selectedDayLessons.length === 1 ? "aula" : "aulas"}
                  </span>
                </div>

                {selectedDayLessons.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayLessons
                      .sort(
                        (a, b) =>
                          new Date(a.scheduled_at).getTime() -
                          new Date(b.scheduled_at).getTime()
                      )
                      .map((lesson) => {
                        const statusConfig = getStatusConfig(lesson.status);
                        const StatusIcon = statusConfig.icon;
                        const vehicle = mockVehicles.find(
                          (v) => v.id === lesson.vehicle_id
                        );

                        return (
                          <div
                            key={lesson.id}
                            className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${statusConfig.color.replace(
                                    "bg-",
                                    "bg-gradient-to-br from-"
                                  )}`}
                                >
                                  <StatusIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900">
                                    Aula #{lesson.id}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {format(
                                      parseISO(lesson.scheduled_at),
                                      "HH:mm"
                                    )}{" "}
                                    • {lesson.duration_minutes} min
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusConfig.color} border`}
                              >
                                {lesson.status === "SCHEDULED"
                                  ? "Agendada"
                                  : lesson.status === "COMPLETED"
                                  ? "Concluída"
                                  : "Cancelada"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-3">
                                <User className="w-4 h-4 text-[#2E5A88]" />
                                <div>
                                  <div className="font-medium">
                                    Aluno #{lesson.student_id}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Contato
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-3">
                                <MapPin className="w-4 h-4 text-[#2E5A88]" />
                                <div>
                                  <div className="font-medium truncate">
                                    {lesson.address?.neighborhood || "Centro"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Local
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-3">
                                <CalendarIcon className="w-4 h-4 text-[#2E5A88]" />
                                <div>
                                  <div className="font-medium">
                                    {vehicle?.license_plate || "ABC-0000"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Veículo
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                                <Clock className="w-4 h-4 text-green-600" />
                                <div>
                                  <div className="font-bold text-green-700">
                                    R$ {lesson.price.toFixed(2)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Valor
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <button className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg font-medium hover:from-blue-100 hover:to-blue-200 transition-all">
                                Ver Detalhes
                              </button>
                              {lesson.status === "SCHEDULED" && (
                                <button className="px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-lg font-medium hover:from-red-100 hover:to-red-200 transition-all">
                                  Cancelar
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border-2 border-dashed border-gray-300/50">
                    <CalendarIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Nenhuma aula neste dia
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Não há aulas agendadas para a data selecionada. Selecione
                      outro dia no calendário para visualizar as aulas.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Resumo Rápido
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="text-gray-700">Ganhos do Dia:</span>
                    <span className="font-bold text-green-700">
                      R${" "}
                      {selectedDayLessons
                        .filter((l) => l.status === "COMPLETED")
                        .reduce((acc, l) => acc + l.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <span className="text-gray-700">Horas Agendadas:</span>
                    <span className="font-bold text-blue-700">
                      {(
                        selectedDayLessons.reduce(
                          (acc, l) => acc + l.duration_minutes,
                          0
                        ) / 60
                      ).toFixed(1)}
                      h
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                    <span className="text-gray-700">Veículos Usados:</span>
                    <span className="font-bold text-purple-700">
                      {
                        new Set(selectedDayLessons.map((l) => l.vehicle_id))
                          .size
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Legenda
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Aulas Agendadas
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Aulas Concluídas
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Aulas Canceladas
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-blue-300 bg-blue-50 rounded-full"></div>
                    <span className="text-sm text-gray-700">Dia Atual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
