import React from 'react';
import { Star, MapPin, Clock, Car, Heart, CheckCircle } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
  onViewDetails: () => void;
  onBookLesson: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  onViewDetails,
  onBookLesson,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const { instructor_details } = instructor;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={instructor.profile_image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
          alt={instructor.full_name}
          className="w-full h-48 object-cover"
        />
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        )}
        {instructor_details.is_verified && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            <CheckCircle className="w-4 h-4" />
            Verificado
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{instructor.full_name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{instructor.address?.city}, {instructor.address?.state}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-600">R$ {instructor_details.hourly_rate}</div>
            <div className="text-xs text-gray-500">por hora</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{instructor_details.average_rating.toFixed(1)}</span>
            <span className="text-gray-500">({instructor_details.total_reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{instructor_details.years_experience} anos</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {instructor_details.license_types.map((license) => (
              <span
                key={license}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
              >
                CNH {license}
              </span>
            ))}
          </div>
        </div>

        {instructor_details.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{instructor_details.bio}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Ver Perfil
          </button>
          <button
            onClick={onBookLesson}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agendar Aula
          </button>
        </div>
      </div>
    </div>
  );
};
