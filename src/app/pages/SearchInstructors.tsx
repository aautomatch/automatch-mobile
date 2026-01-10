import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, X, Users, Award } from 'lucide-react';

import { InstructorCard } from '../components/InstructorCard';
import { InstructorService } from '../../services/instructor-public-service';

import { InstructorPublic } from '../types/instructor-public';
import { InstructorAdapter } from '../../adapters/instructor.adapter';
import { InstructorCardModel } from '../../adapters/instructor.adapter';

interface SearchInstructorsProps {
  onNavigate: (page: string) => void;
  onSelectInstructor?: (instructor: InstructorCardModel) => void;
}

export const SearchInstructors: React.FC<SearchInstructorsProps> = ({
  onNavigate,
  onSelectInstructor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 🔹 dados crus da API
  const [instructors, setInstructors] = useState<InstructorPublic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    licenseType: 'all',
    minRating: 0,
    maxPrice: 200,
    verified: false,
    experience: 'all'
  });

  useEffect(() => {
    loadInstructors();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchInstructors();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filters]);

  const loadInstructors = async () => {
    try {
      setIsLoading(true);
      const response = await InstructorService.getAll();
      setInstructors(response.data);
    } catch (error) {
      console.error('Erro ao carregar instrutores', error);
      setInstructors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchInstructors = async () => {
  try {
    setIsLoading(true);

    const params = {
      nameOrCity: searchTerm.trim() || undefined,
      minRating:
        filters.minRating > 0 ? Number(filters.minRating) : undefined,
      maxHourlyRate:
        filters.maxPrice !== 200 ? Number(filters.maxPrice) : undefined,
      minYearsExperience: getMinYearsExperience(filters.experience)
    };

    const hasFilters = Object.values(params).some(v => v !== undefined);

    const response = hasFilters
      ? await InstructorService.search(params)
      : await InstructorService.getAll();

    setInstructors(response.data);
  } catch (error) {
    console.error('Erro ao buscar instrutores', error);
    setInstructors([]);
  } finally {
    setIsLoading(false);
  }
};


  const getMinYearsExperience = (experience: string): number | undefined => {
    switch (experience) {
      case 'beginner':
        return 0;
      case 'intermediate':
        return 3;
      case 'expert':
        return 10;
      default:
        return undefined;
    }
  };

  // 🔹 ADAPTER + FILTROS LOCAIS
  const filteredInstructors: InstructorCardModel[] = instructors
    .map(InstructorAdapter.fromPublic)
    .filter((instructor) => {
      const details = instructor.instructor_details;

      const matchesLicense =
        filters.licenseType === 'all' ||
        details.license_types.includes(filters.licenseType);

      const matchesVerified =
        !filters.verified || details.is_verified;

      const years = details.years_experience;

      const matchesExperience =
        filters.experience === 'all' ||
        (filters.experience === 'beginner' && years < 3) ||
        (filters.experience === 'intermediate' && years >= 3 && years < 10) ||
        (filters.experience === 'expert' && years >= 10);

      const matchesRating =
        filters.minRating === 0 ||
        details.average_rating >= filters.minRating;

      const matchesPrice =
        details.hourly_rate <= filters.maxPrice;

      return (
        matchesLicense &&
        matchesVerified &&
        matchesExperience &&
        matchesRating &&
        matchesPrice
      );
    });

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const handleViewDetails = (instructor: InstructorCardModel) => {
    onSelectInstructor?.(instructor);
    onNavigate('instructor-details');
  };

  const handleBookLesson = (instructor: InstructorCardModel) => {
    onSelectInstructor?.(instructor);
    onNavigate('book-lesson');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      licenseType: 'all',
      minRating: 0,
      maxPrice: 200,
      verified: false,
      experience: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
      <div className="container mx-auto px-4">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Encontre seu Instrutor Ideal
          </h1>

          <div className="mt-6 flex gap-4">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou cidade"
              className="flex-1 px-4 py-3 rounded-xl border"
            />

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              <Filter className="w-5 h-5" />
            </button>

            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-gray-200 rounded-xl"
            >
              Limpar
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-xl border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minRating: Number(e.target.value)
                    })
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="0">Todas as avaliações</option>
                  <option value="3.5">3.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐⭐</option>
                  <option value="4.5">4.5+ ⭐⭐⭐</option>
                  <option value="4.8">4.8+ ⭐⭐⭐⭐</option>
                </select>

                <select
                  value={filters.experience}
                  onChange={(e) =>
                    setFilters({ ...filters, experience: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">Todas experiências</option>
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="expert">Expert</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) =>
                      setFilters({ ...filters, verified: e.target.checked })
                    }
                  />
                  <Award className="w-4 h-4 text-blue-600" />
                  Verificados
                </label>

                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <p className="text-center py-20">Carregando...</p>
        ) : filteredInstructors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
                onViewDetails={() => handleViewDetails(instructor)}
                onBookLesson={() => handleBookLesson(instructor)}
                isFavorite={favorites.includes(instructor.id)}
                onToggleFavorite={() => handleToggleFavorite(instructor.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p>Nenhum instrutor encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};
