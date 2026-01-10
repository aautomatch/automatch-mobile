import React, { useState } from "react";
import {
  Star,
  ArrowLeft,
  Filter,
  Search,
  MessageCircle,
  Clock,
  User,
  Calendar,
  MoreVertical,
  Award,
  BarChart3,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Review {
  id: string;
  studentId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  lessonType: string;
  vehicleUsed: string;
  lessonId: string;
  studentPhone?: string;
  studentEmail?: string;
  status: "unread" | "read";
}

interface InstructorReviewsPageProps {
  onNavigate: (page: string) => void;
}

export const InstructorReviewsPage: React.FC<InstructorReviewsPageProps> = ({
  onNavigate,
}) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      studentId: "101",
      studentName: "João Silva",
      rating: 5,
      comment: "Excelente instrutor! Muito paciente e didático. Aprendi a dirigir em apenas 10 aulas.",
      date: "2024-01-15",
      lessonType: "Prática",
      vehicleUsed: "Fiat Argo",
      lessonId: "L001",
      studentPhone: "(11) 98765-4321",
      studentEmail: "joao.silva@email.com",
      status: "read",
    },
    {
      id: "2",
      studentId: "102",
      studentName: "Maria Santos",
      rating: 4,
      comment: "Boa didática, mas poderia ser mais pontual. Aprendi bastante sobre direção defensiva.",
      date: "2024-01-10",
      lessonType: "Teórica + Prática",
      vehicleUsed: "VW Gol",
      lessonId: "L002",
      studentPhone: "(11) 91234-5678",
      studentEmail: "maria.santos@email.com",
      status: "unread",
    },
    {
      id: "3",
      studentId: "103",
      studentName: "Pedro Costa",
      rating: 5,
      comment: "Melhor instrutor que já tive! Explica tudo com calma e tem muita experiência.",
      date: "2024-01-05",
      lessonType: "Prática",
      vehicleUsed: "Chevrolet Onix",
      lessonId: "L003",
      studentPhone: "(11) 92345-6789",
      studentEmail: "pedro.costa@email.com",
      status: "read",
    },
    {
      id: "4",
      studentId: "104",
      studentName: "Ana Oliveira",
      rating: 3,
      comment: "Bom profissional, mas as aulas poderiam ser mais dinâmicas. Sinto que poderia avançar mais rápido.",
      date: "2024-01-02",
      lessonType: "Prática",
      vehicleUsed: "Fiat Argo",
      lessonId: "L004",
      studentPhone: "(11) 93456-7890",
      studentEmail: "ana.oliveira@email.com",
      status: "unread",
    },
    {
      id: "5",
      studentId: "105",
      studentName: "Carlos Mendes",
      rating: 5,
      comment: "Instrutor muito experiente e atencioso. Superou todas as minhas expectativas! Recomendo!",
      date: "2023-12-28",
      lessonType: "Intensivo",
      vehicleUsed: "VW Polo",
      lessonId: "L005",
      studentPhone: "(11) 94567-8901",
      studentEmail: "carlos.mendes@email.com",
      status: "read",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
  const unreadReviews = reviews.filter(r => r.status === "unread").length;
  const readPercentage = ((reviews.filter(r => r.status === "read").length / totalReviews) * 100).toFixed(0);

  const filteredReviews = reviews.filter(review => {
    if (filter !== "all" && review.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        review.studentName.toLowerCase().includes(term) ||
        review.comment.toLowerCase().includes(term) ||
        review.lessonType.toLowerCase().includes(term) ||
        review.vehicleUsed.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const toggleReadStatus = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { 
        ...r, 
        status: r.status === "unread" ? "read" : "unread" 
      } : r
    ));
  };

  const renderStars = (rating: number, size: "sm" | "md" = "md") => {
    const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className={`ml-2 font-bold text-gray-700 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("instructor-dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
                  <span className="text-xl sm:text-3xl">Avaliações dos Alunos</span>
                </h1>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                  Visualize as avaliações recebidas dos alunos
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-medium"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  +0.3
                </span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Avaliação Média</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  {fiveStarReviews}
                </span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900">
                {totalReviews}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total de Avaliações</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  {readPercentage}%
                </span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900">
                {readPercentage}%
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Visualizadas</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  98%
                </span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-gray-900">
                {fiveStarReviews}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">⭐ 5 Estrelas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-lg shadow-gray-200/50 mb-6 sm:mb-8">
          {showMobileFilters && (
            <div className="mb-4 pb-4 border-b border-gray-200 sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Filtros</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-2 rounded-lg font-medium text-sm ${
                    filter === "all"
                      ? "bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-3 py-2 rounded-lg font-medium text-sm ${
                    filter === "unread"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Não Lidas ({unreadReviews})
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-3 py-2 rounded-lg font-medium text-sm ${
                    filter === "read"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Lidas
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="hidden sm:flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === "all"
                    ? "bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === "unread"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Não Lidas ({unreadReviews})
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === "read"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Lidas
              </button>
            </div>

            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar avaliações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs sm:text-sm text-gray-600">
              {filteredReviews.length} avaliação(ões) encontrada(s)
            </span>
            <button
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
              }}
              className="text-xs sm:text-sm text-[#2E5A88] hover:text-[#1E3A5F] font-medium"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Nenhuma avaliação encontrada
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto px-4 text-sm sm:text-base">
                {filter === "unread"
                  ? "Não há avaliações não lidas. Todas foram visualizadas!"
                  : "Nenhuma avaliação corresponde aos filtros selecionados."}
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Ver Todas as Avaliações
              </button>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="sm:hidden mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2E5A88] to-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold">
                        {review.studentName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {review.studentName}
                        </h3>
                        {renderStars(review.rating, "sm")}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleReadStatus(review.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {review.status === "unread" ? (
                        <EyeOff className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(review.date), "dd/MM/yyyy")}
                    <span className="mx-1">•</span>
                    <Clock className="w-3 h-3" />
                    {review.lessonType}
                  </div>
                </div>

                <div className="hidden sm:flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2E5A88] to-[#4CAF50] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {review.studentName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {review.studentName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {format(new Date(review.date), "dd/MM/yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      review.status === "unread"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}>
                      {review.status === "unread" ? "Não Lida" : "Lida"}
                    </span>
                    <button
                      onClick={() => toggleReadStatus(review.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {review.status === "unread" ? (
                        <EyeOff className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm">
                    <Clock className="w-3 h-3" />
                    {review.lessonType}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs sm:text-sm">
                    <User className="w-3 h-3" />
                    Aluno #{review.studentId}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs sm:text-sm">
                    <Award className="w-3 h-3" />
                    {review.vehicleUsed}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:gap-3">
                  <button
                    onClick={() => onNavigate(`student/${review.studentId}`)}
                    className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-lg font-medium hover:from-gray-100 hover:to-blue-100 transition-all duration-300 border border-gray-200 text-xs sm:text-sm"
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">Perfil do Aluno</span>
                  </button>
                  <button
                    onClick={() => onNavigate(`history/${review.studentId}`)}
                    className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-lg font-medium hover:from-amber-100 hover:to-orange-100 transition-all duration-300 border border-amber-200 text-xs sm:text-sm"
                  >
                    <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">Histórico</span>
                  </button>
                </div>

                {expandedReview === review.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Telefone:</span> {review.studentPhone}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {review.studentEmail}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">ID da Aula:</span> {review.lessonId}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                  className="sm:hidden w-full mt-3 text-center text-[#2E5A88] text-sm font-medium"
                >
                  {expandedReview === review.id ? "Ver menos" : "Ver mais informações"} →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};