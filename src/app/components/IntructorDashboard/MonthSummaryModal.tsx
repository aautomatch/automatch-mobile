import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  ChevronRight,
  BarChart3,
  PieChart,
  Target,
  Award,
  FileText,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MonthSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReports?: () => void;
  metrics?: {
    completedLessons: number;
    totalHours: number;
    newStudents: number;
    averageRating: number;
    monthlyEarnings: number;
    totalStudents: number;
    scheduledLessons: number;
    cancellationRate: number;
  };
}
export const MonthSummaryModal: React.FC<MonthSummaryModalProps> = ({
  isOpen,
  onClose,
  onNavigateToReports,
  metrics = {
    completedLessons: 24,
    totalHours: 48.5,
    newStudents: 5,
    averageRating: 4.8,
    monthlyEarnings: 5240.0,
    totalStudents: 32,
    scheduledLessons: 28,
    cancellationRate: 8.3,
  },
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "earnings"
  >("overview");

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentMonth = format(new Date(), "MMMM yyyy", { locale: ptBR });

  const weeklyData = [
    { week: "Sem 1", earnings: 1200, lessons: 6 },
    { week: "Sem 2", earnings: 1350, lessons: 7 },
    { week: "Sem 3", earnings: 1540, lessons: 8 },
    { week: "Sem 4", earnings: 1150, lessons: 5 },
  ];

  const topStudents = [
    { name: "João Silva", lessons: 8, total: 1200, rating: 5 },
    { name: "Maria Santos", lessons: 6, total: 900, rating: 5 },
    { name: "Pedro Costa", lessons: 5, total: 750, rating: 4 },
    { name: "Ana Oliveira", lessons: 4, total: 600, rating: 5 },
  ];

  const lessonTypes = [
    { type: "Prática", count: 18, color: "bg-[#2E5A88]" },
    { type: "Teórica", count: 4, color: "bg-[#4CAF50]" },
    { type: "Simulador", count: 2, color: "bg-[#FF9800]" },
  ];

  const getProgressColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80)
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (percentage >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (percentage >= 40)
      return "bg-gradient-to-r from-amber-500 to-orange-500";
    return "bg-gradient-to-r from-gray-400 to-gray-500";
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 w-full z-[9998] bg-black/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center touch-none"
        style={{ height: "100dvh" }}
        onClick={onClose}
      >
        <div
          className="bg-white w-full h-full sm:h-auto max-w-none sm:max-w-4xl max-h-full sm:max-h-[90vh] rounded-none sm:rounded-2xl flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-shrink-0">
            <div className="p-4 sm:p-6 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-lg flex items-center justify-center shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Resumo Detalhado
                    </h2>
                    <p className="text-gray-600 capitalize">{currentMonth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 scrollbar-hide-webkit-overflow-scrolling-touch md:justify-center">
              <div className="flex min-w-max border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-shrink-0 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                    activeTab === "overview"
                      ? "text-[#2E5A88] border-b-2 border-[#2E5A88]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Visão Geral
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("students")}
                  className={`flex-shrink-0 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                    activeTab === "students"
                      ? "text-[#2E5A88] border-b-2 border-[#2E5A88]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Alunos
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("earnings")}
                  className={`flex-shrink-0 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                    activeTab === "earnings"
                      ? "text-[#2E5A88] border-b-2 border-[#2E5A88]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Faturamento
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        +12%
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {metrics.completedLessons}
                    </div>
                    <div className="text-xs text-gray-600">
                      Aulas Concluídas
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        +8%
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {metrics.totalHours}h
                    </div>
                    <div className="text-xs text-gray-600">
                      Horas Trabalhadas
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        +15%
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      R$ {metrics.monthlyEarnings.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">Faturamento</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        +0.2
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {metrics.averageRating.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600">Avaliação Média</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#2E5A88]" />
                      Desempenho Semanal
                    </h3>
                    <span className="text-sm text-gray-600">Janeiro 2024</span>
                  </div>

                  <div className="space-y-4">
                    {weeklyData.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">
                            {week.week}
                          </span>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              R$ {week.earnings.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {week.lessons} aulas
                            </div>
                          </div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(
                              week.earnings,
                              2000
                            )} rounded-full`}
                            style={{
                              width: `${(week.earnings / 2000) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-purple-600" />
                      Tipos de Aula
                    </h3>
                    <div className="space-y-4">
                      {lessonTypes.map((type, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${type.color}`}
                            ></div>
                            <span className="text-gray-700">{type.type}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-900">
                              {type.count}
                            </span>
                            <span className="text-sm text-gray-500">
                              {(
                                (type.count / metrics.completedLessons) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Metas do Mês
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">
                            Aulas Concluídas
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {metrics.completedLessons}/30
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-full"
                            style={{
                              width: `${
                                (metrics.completedLessons / 30) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">
                            Faturamento
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            R$ {metrics.monthlyEarnings.toFixed(2)}/R$ 6.000
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-full"
                            style={{
                              width: `${
                                (metrics.monthlyEarnings / 6000) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                    <div className="text-2xl font-bold text-gray-900">
                      {metrics.totalStudents}
                    </div>
                    <div className="text-sm text-gray-600">Total de Alunos</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-2xl font-bold text-gray-900">
                      {metrics.newStudents}
                    </div>
                    <div className="text-sm text-gray-600">Novos Alunos</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                    <div className="text-2xl font-bold text-gray-900">
                      {metrics.averageRating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Satisfação Média
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                      Top Alunos do Mês
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {topStudents.map((student, index) => (
                      <div
                        key={index}
                        className="p-6 hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#2E5A88] to-[#4CAF50] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">
                                {student.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {student.lessons} aulas • R${" "}
                                {student.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < student.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {student.rating}/5
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "earnings" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-3xl font-bold text-gray-900">
                      R$ {metrics.monthlyEarnings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Faturamento Total
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                    <div className="text-2xl font-bold text-gray-900">
                      R${" "}
                      {(
                        metrics.monthlyEarnings / metrics.completedLessons
                      ).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Média por Aula</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
                    <div className="text-2xl font-bold text-gray-900">
                      R${" "}
                      {(metrics.monthlyEarnings / metrics.totalHours).toFixed(
                        2
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Por Hora</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Projeção de Ganhos
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Mês Atual</span>
                        <span className="font-bold text-gray-900">
                          R$ {metrics.monthlyEarnings.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Próximo Mês</span>
                        <span className="font-bold text-gray-900">
                          R$ {(metrics.monthlyEarnings * 1.15).toFixed(2)}
                          <span className="ml-2 text-sm text-green-600">
                            (+15%)
                          </span>
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
