import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  DollarSign,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format, isSameDay, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MobileCalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  monthDays: Date[];
  lessonsByDate: Record<string, any[]>;
  setSelectedDate: (date: Date) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  onNavigate: (page: string) => void;
}

export const MobileCalendar: React.FC<MobileCalendarProps> = ({
  currentDate,
  selectedDate,
  monthDays,
  lessonsByDate,
  setSelectedDate,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  onNavigate,
}) => {
  const selectedDayLessons =
    (selectedDate && lessonsByDate[format(selectedDate, "yyyy-MM-dd")]) || [];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          textColor: "text-blue-800",
          bgColor: "bg-blue-50",
          icon: Clock,
          label: "Agendada",
        };
      case "COMPLETED":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          textColor: "text-green-800",
          bgColor: "bg-green-50",
          icon: CheckCircle,
          label: "Concluída",
        };
      case "CANCELLED":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          textColor: "text-red-800",
          bgColor: "bg-red-50",
          icon: XCircle,
          label: "Cancelada",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          textColor: "text-gray-800",
          bgColor: "bg-gray-50",
          icon: AlertCircle,
          label: "Pendente",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
        <br />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("instructor-dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>{" "}
            <div className="w-10 h-10 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-lg flex items-center justify-center shadow-lg">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Calendário</h1>
              <p className="text-xs text-gray-600">Suas aulas agendadas</p>
            </div>
          </div>

          <button
            onClick={goToToday}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-lg font-medium text-sm border border-gray-200 hover:border-[#2E5A88]"
          >
            Hoje
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <h2 className="text-lg font-bold text-gray-900 text-center">
            {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
          </h2>

          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-3">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-center text-xs font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
          {Array.from({
            length: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            ).getDay(),
          }).map((_, index) => (
            <div key={`empty-${index}`} className="h-14 rounded-lg"></div>
          ))}

          {monthDays.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayLessons = lessonsByDate[dateKey] || [];
            const isCurrentDay = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`h-14 rounded-lg border transition-all relative
                  ${
                    isSelected
                      ? "border-[#2E5A88] bg-gradient-to-br from-[#2E5A88]/10 to-[#4CAF50]/10"
                      : isCurrentDay
                      ? "border-blue-300 bg-blue-50/50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
              >
                <div className="absolute top-1 left-1">
                  <span
                    className={`text-sm font-medium ${
                      isCurrentDay
                        ? "text-[#2E5A88]"
                        : isSelected
                        ? "text-[#2E5A88] font-bold"
                        : "text-gray-900"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>

                {dayLessons.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-0.5">
                      {dayLessons.slice(0, 3).map((lesson, idx) => {
                        const statusConfig = getStatusConfig(lesson.status);
                        return (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${statusConfig.textColor.replace(
                              "text-",
                              "bg-"
                            )}`}
                          />
                        );
                      })}
                      {dayLessons.length > 3 && (
                        <div className="text-[8px] text-gray-500">+</div>
                      )}
                    </div>
                  </div>
                )}

                {dayLessons.length > 0 && (
                  <div className="absolute top-1 right-1">
                    <div
                      className={`text-[10px] font-bold px-1 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#2E5A88] text-white"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {dayLessons.length}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {selectedDate
                    ? format(selectedDate, "EEEE, d 'de' MMMM", {
                        locale: ptBR,
                      })
                    : "Selecione um dia"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedDayLessons.length}{" "}
                  {selectedDayLessons.length === 1 ? "aula" : "aulas"}
                </p>
              </div>

              {selectedDayLessons.length > 0 && (
                <div className="text-right">
                  <div className="text-sm font-bold text-green-700">
                    R${" "}
                    {selectedDayLessons
                      .filter((l) => l.status === "COMPLETED")
                      .reduce((acc, l) => acc + l.price, 0)
                      .toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">Ganhos do dia</div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Agendadas</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Concluídas</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Canceladas</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {selectedDayLessons.length === 0 ? (
              <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-dashed border-gray-300">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">Nenhuma aula neste dia</p>
                <p className="text-sm text-gray-500 mt-1">
                  Selecione outro dia no calendário
                </p>
              </div>
            ) : (
              selectedDayLessons
                .sort(
                  (a, b) =>
                    new Date(a.scheduled_at).getTime() -
                    new Date(b.scheduled_at).getTime()
                )
                .map((lesson) => {
                  const statusConfig = getStatusConfig(lesson.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${statusConfig.bgColor} rounded-xl flex items-center justify-center shadow-sm`}
                          >
                            <StatusIcon
                              className={`w-6 h-6 ${statusConfig.textColor}`}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              Aula #{lesson.id}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {format(new Date(lesson.scheduled_at), "HH:mm")}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600">
                                {lesson.duration_minutes} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Aluno #{lesson.student_id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 truncate">
                            {lesson.address?.neighborhood || "Local combinado"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Veículo {lesson.vehicle_id}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-bold text-green-700">
                              R$ {lesson.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-lg font-medium text-sm border border-gray-200 hover:border-[#2E5A88]">
                          Detalhes
                        </button>
                        {lesson.status === "SCHEDULED" && (
                          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-lg font-medium text-sm border border-red-200 hover:border-red-300">
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-4">Resumo do Mês</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2">
              <div className="text-lg font-bold text-green-600">
                {
                  Object.values(lessonsByDate)
                    .flat()
                    .filter((l: any) => l.status === "COMPLETED").length
                }
              </div>
              <div className="text-xs text-gray-600">Concluídas</div>
            </div>
            <div className="text-center p-2">
              <div className="text-lg font-bold text-blue-600">
                {
                  Object.values(lessonsByDate)
                    .flat()
                    .filter((l: any) => l.status === "SCHEDULED").length
                }
              </div>
              <div className="text-xs text-gray-600">Agendadas</div>
            </div>
            <div className="text-center p-2">
              <div className="text-lg font-bold text-red-600">
                {
                  Object.values(lessonsByDate)
                    .flat()
                    .filter((l: any) => l.status === "CANCELLED").length
                }
              </div>
              <div className="text-xs text-gray-600">Canceladas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
