import React from 'react';
import { Star, MapPin, Clock, Heart, Award, CheckCircle, GraduationCap, Target } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
  onViewDetails: () => void;
  onBookLesson: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showBookButton?: boolean;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  onViewDetails,
  onBookLesson,
  isFavorite = false,
  onToggleFavorite,
  showBookButton = true,
}) => {
  const { instructor_details } = instructor;

  // Determinar nível de experiência
  const getExperienceLevel = (years: number) => {
    if (years < 3) return { label: 'Iniciante', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (years < 10) return { label: 'Experiente', color: 'text-green-600', bg: 'bg-green-100' };
    return { label: 'Especialista', color: 'text-purple-600', bg: 'bg-purple-100' };
  };

  const experience = getExperienceLevel(instructor_details.years_experience || 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
      {/* Cabeçalho com imagem */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={instructor.profile_image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
          alt={instructor.full_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {instructor_details.is_verified && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <CheckCircle className="w-3 h-3" />
              Verificado
            </div>
          )}
          
          {/* Nível de experiência */}
          <div className={`flex items-center gap-1.5 ${experience.bg} ${experience.color} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
            <Target className="w-3 h-3" />
            {experience.label}
          </div>
        </div>
        
        {/* Botão favorito */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:scale-110 transition-all duration-300 hover:bg-white"
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 animate-pulse' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </button>
        )}
      </div>

      {/* Corpo do card */}
      <div className="p-5 md:p-6">
        {/* Cabeçalho com nome e preço */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-1 truncate group-hover:text-blue-600 transition-colors">
              {instructor.full_name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {instructor.address?.city || 'Cidade não informada'}, {instructor.address?.state || 'UF'}
              </span>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0 ml-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              R$ {instructor_details.hourly_rate?.toFixed(2) || '0,00'}
            </div>
            <div className="text-xs text-gray-500">por hora</div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Avaliação */}
          <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">
                {instructor_details.average_rating?.toFixed(1) || '0.0'}
                <span className="text-gray-500 text-sm">/5.0</span>
              </div>
              <div className="text-xs text-gray-600">
                {instructor_details.total_reviews || 0} avaliações
              </div>
            </div>
          </div>

          {/* Experiência */}
          <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">
                {instructor_details.years_experience || 0} anos
              </div>
              <div className="text-xs text-gray-600">experiência</div>
            </div>
          </div>
        </div>

        {/* Categorias CNH */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Habilitações</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(instructor_details.license_types || ['B']).map((license) => (
              <span
                key={license}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-lg text-sm font-medium border border-gray-200 hover:border-blue-300 transition-colors"
              >
                CNH {license}
              </span>
            ))}
          </div>
        </div>

        {/* Bio resumida */}
        {instructor_details.bio && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 line-clamp-3 italic">
              "{instructor_details.bio.substring(0, 120)}..."
            </p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl font-bold border border-gray-200 hover:border-blue-400 hover:from-gray-100 hover:to-blue-100 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>Ver Perfil</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
          
          {showBookButton && (
            <button
              onClick={onBookLesson}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              Agendar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};