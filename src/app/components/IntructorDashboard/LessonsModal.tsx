import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  DollarSign,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight as RightIcon,
} from "lucide-react";

interface LessonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingLessons?: any[];
}

const daysOfWeek = [
  { id: 0, name: "Domingo", short: "Dom" },
  { id: 1, name: "Segunda-feira", short: "Seg" },
  { id: 2, name: "Terça-feira", short: "Ter" },
  { id: 3, name: "Quarta-feira", short: "Qua" },
  { id: 4, name: "Quinta-feira", short: "Qui" },
  { id: 5, name: "Sexta-feira", short: "Sex" },
  { id: 6, name: "Sábado", short: "Sáb" },
];

const lessonTypes = [
  { id: "all", name: "Todas", color: "bg-gray-100 text-gray-800" },
  { id: "SCHEDULED", name: "Agendadas", color: "bg-blue-100 text-blue-800" },
  { id: "COMPLETED", name: "Concluídas", color: "bg-green-100 text-green-800" },
  { id: "CANCELLED", name: "Canceladas", color: "bg-red-100 text-red-800" },
  {
    id: "IN_PROGRESS",
    name: "Em Andamento",
    color: "bg-amber-100 text-amber-800",
  },
];

export const LessonsModal: React.FC<LessonsModalProps> = ({
  isOpen,
  onClose,
  existingLessons = [],
}) => {
  const [lessons, setLessons] = useState<any[]>(existingLessons);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  useEffect(() => {
    if (isOpen && existingLessons.length === 0) {
      fetchLessons();
    }
  }, [isOpen, existingLessons]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const startOfWeek = getStartOfWeek(now);

      const mockLessons: any[] = [
        {
          id: "1",
          instructor_id: "1",
          student_id: "101",
          vehicle_id: "v1",
          scheduled_at: new Date(startOfWeek.getTime()).toISOString(),
          duration_minutes: 60,
          price: 150.0,
          status: "SCHEDULED",
          meeting_point: "Rua das Flores, 123",
          notes: "Primeira aula do aluno",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          instructor_id: "1",
          student_id: "102",
          vehicle_id: "v2",
          scheduled_at: new Date(
            startOfWeek.getTime() + 86400000
          ).toISOString(),
          duration_minutes: 90,
          price: 200.0,
          status: "SCHEDULED",
          meeting_point: "Avenida Central, 456",
          notes: "Aula de baliza",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          instructor_id: "1",
          student_id: "103",
          vehicle_id: "v3",
          scheduled_at: new Date(
            startOfWeek.getTime() + 172800000
          ).toISOString(),
          duration_minutes: 60,
          price: 150.0,
          status: "COMPLETED",
          meeting_point: "Praça da Matriz",
          notes: "Aula concluída com sucesso",
          created_at: new Date(Date.now() - 259200000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "4",
          instructor_id: "1",
          student_id: "104",
          vehicle_id: "v1",
          scheduled_at: new Date(
            startOfWeek.getTime() + 259200000
          ).toISOString(),
          duration_minutes: 120,
          price: 250.0,
          status: "SCHEDULED",
          meeting_point: "Shopping Center",
          notes: "Aula noturna",
          created_at: new Date(Date.now() - 345600000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "5",
          instructor_id: "1",
          student_id: "105",
          vehicle_id: "v2",
          scheduled_at: new Date(
            startOfWeek.getTime() + 345600000
          ).toISOString(),
          duration_minutes: 60,
          price: 150.0,
          status: "SCHEDULED",
          meeting_point: "Centro da Cidade",
          notes: "Aula de estacionamento",
          created_at: new Date(Date.now() - 432000000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "6",
          instructor_id: "1",
          student_id: "106",
          vehicle_id: "v3",
          scheduled_at: new Date(
            startOfWeek.getTime() + 432000000
          ).toISOString(),
          duration_minutes: 90,
          price: 200.0,
          status: "SCHEDULED",
          meeting_point: "Avenida Paulista",
          notes: "Aula de rodovia",
          created_at: new Date(Date.now() - 518400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setLessons(mockLessons);
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStartOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const isInCurrentWeek = (dateString: string): boolean => {
    const date = new Date(dateString);
    const startOfWeek = getStartOfWeek(currentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return date >= startOfWeek && date <= endOfWeek;
  };

  const weeklyLessons = lessons.filter((lesson) =>
    isInCurrentWeek(lesson.scheduled_at)
  );

  const filteredLessons = weeklyLessons.filter((lesson) => {
    if (selectedFilter !== "all" && lesson.status !== selectedFilter) {
      return false;
    }

    if (selectedDay !== "all") {
      const lessonDay = new Date(lesson.scheduled_at).getDay();
      if (lessonDay !== parseInt(selectedDay)) {
        return false;
      }
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        lesson.id.toLowerCase().includes(searchLower) ||
        lesson.notes?.toLowerCase().includes(searchLower) ||
        lesson.meeting_point.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeek(newDate);
  };

  const getStatusInfo = (status: any["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return {
          icon: Clock,
          color: "bg-blue-100 text-blue-800 border-blue-200",
          text: "Agendada",
        };
      case "COMPLETED":
        return {
          icon: CheckCircle2,
          color: "bg-green-100 text-green-800 border-green-200",
          text: "Concluída",
        };
      case "CANCELLED":
        return {
          icon: XCircle,
          color: "bg-red-100 text-red-800 border-red-200",
          text: "Cancelada",
        };
      case "IN_PROGRESS":
        return {
          icon: AlertCircle,
          color: "bg-amber-100 text-amber-800 border-amber-200",
          text: "Em Andamento",
        };
      default:
        return {
          icon: Clock,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          text: "Pendente",
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupLessonsByDay = (lessons: any[]) => {
    const startOfWeek = getStartOfWeek(currentWeek);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return weekDays.map((date) => {
      const dayLessons = lessons.filter((lesson) => {
        const lessonDate = new Date(lesson.scheduled_at);
        return lessonDate.toDateString() === date.toDateString();
      });

      return {
        date,
        dayName: date.toLocaleDateString("pt-BR", { weekday: "long" }),
        formattedDate: date.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          weekday: "long",
        }),
        lessons: dayLessons,
      };
    });
  };

  const groupedLessons = groupLessonsByDay(filteredLessons);
  const startOfWeek = getStartOfWeek(currentWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-x-hidden">
      <div className="bg-white w-full max-w-6xl rounded-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">Aulas da Semana</h2>
              <p className="text-sm text-gray-600 truncate">
                Visualize e gerencie suas aulas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-x-hidden">
          <div className="mb-6 bg-gradient-to-br from-[#2E5A88]/10 to-[#4CAF50]/10 border rounded-xl p-4 overflow-hidden">
            <div className="grid grid-cols-[40px_1fr_40px] items-center gap-2 min-w-0">
              <button
                onClick={() => navigateWeek("prev")}
                className="p-2 rounded-lg hover:bg-white/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center min-w-0 overflow-hidden">
                <h3 className="font-bold text-base sm:text-lg break-words whitespace-normal">
                  Semana de{" "}
                  {startOfWeek.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  a{" "}
                  {endOfWeek.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                  })}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentWeek.getFullYear()}
                </p>
              </div>

              <button
                onClick={() => navigateWeek("next")}
                className="p-2 rounded-lg hover:bg-white/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex justify-center sm:justify-end">
              <button
                onClick={() => setCurrentWeek(new Date())}
                className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-white"
              >
                Semana Atual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full min-w-0 px-3 py-2 border rounded-lg"
            >
              {lessonTypes.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full min-w-0 px-3 py-2 border rounded-lg"
            >
              <option value="all">Todos os dias</option>
              {daysOfWeek.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aula..."
              className="w-full min-w-0 px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
            <span className="text-sm text-gray-600">
              {filteredLessons.length} aula(s) nesta semana
            </span>
            <button
              onClick={() => {
                setSelectedFilter("all");
                setSelectedDay("all");
                setSearchTerm("");
              }}
              className="text-sm text-[#2E5A88] hover:text-[#1E3A5F] font-medium"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5A88] mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando aulas da semana...</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-dashed border-gray-300">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              Nenhuma aula agendada para esta semana
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedLessons.map((day, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div
                  className={`px-4 py-4 border-b ${
                    day.date.toDateString() === new Date().toDateString()
                      ? "bg-gradient-to-r from-[#2E5A88]/10 to-[#4CAF50]/10 border-[#2E5A88]/30"
                      : "bg-gradient-to-r from-gray-50 to-blue-50/30 border-gray-200"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          day.date.toDateString() === new Date().toDateString()
                            ? "bg-gradient-to-r from-[#2E5A88] to-[#4CAF50]"
                            : "bg-gray-100"
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            day.date.toDateString() ===
                            new Date().toDateString()
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {day.date.getDate()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base sm:text-lg capitalize">
                          {day.dayName}
                          {day.date.toDateString() ===
                            new Date().toDateString() && (
                            <span className="ml-2 text-sm font-medium bg-[#2E5A88] text-white px-2 py-1 rounded-full">
                              Hoje
                            </span>
                          )}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {day.date.toLocaleDateString("pt-BR", {
                            month: "long",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                      {day.lessons.length} aula(s)
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {day.lessons.length > 0 ? (
                    day.lessons.map((lesson) => {
                      const statusInfo = getStatusInfo(lesson.status);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <div
                          key={lesson.id}
                          className="p-6 hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${statusInfo.color}`}
                                >
                                  <StatusIcon className="w-3 h-3" />
                                  {statusInfo.text}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium">
                                    {formatTime(lesson.scheduled_at)}
                                  </span>
                                  <span className="text-gray-500">•</span>
                                  <span className="text-gray-600">
                                    {lesson.duration_minutes} min
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium">
                                    Aluno #{lesson.student_id}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-green-600" />
                                  <span className="font-bold text-green-700">
                                    R$ {lesson.price.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">
                                  {lesson.meeting_point}
                                </span>
                              </div>

                              {lesson.notes && (
                                <div className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-200">
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">
                                      Observações:{" "}
                                    </span>
                                    {lesson.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      Nenhuma aula para este dia
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-xl border border-gray-200 p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-gray-900">Resumo da Semana</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-xl sm:text-2xl font-bold">
                {weeklyLessons.filter((l) => l.status === "SCHEDULED").length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Agendadas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {weeklyLessons.filter((l) => l.status === "COMPLETED").length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Concluídas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-amber-600">
                {weeklyLessons.reduce((acc, l) => acc + l.duration_minutes, 0) /
                  60}
              </div>
              <div className="text-sm text-gray-600 mt-1">Horas totais</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                R${" "}
                {weeklyLessons.reduce((acc, l) => acc + l.price, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Valor total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
