import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, DollarSign, X, Users, Award, Clock } from 'lucide-react';
import { mockInstructors } from '../data/mockData';
import { InstructorCard } from '../components/InstructorCard';
import { Instructor } from '../types';

interface SearchInstructorsProps {
  onNavigate: (page: string) => void;
  onSelectInstructor?: (instructor: Instructor) => void;
}

export const SearchInstructors: React.FC<SearchInstructorsProps> = ({ onNavigate, onSelectInstructor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    licenseType: 'all',
    transmission: 'all',
    minRating: 0,
    maxPrice: 200,
    verified: false,
    experience: 'all'
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredInstructors = mockInstructors.filter(instructor => {
    const matchesSearch = instructor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (instructor.address?.city?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesLicense = filters.licenseType === 'all' ||
      (instructor.instructor_details?.license_types || []).includes(filters.licenseType);

    const matchesRating = (instructor.instructor_details?.average_rating || 0) >= filters.minRating;

    const matchesPrice = (instructor.instructor_details?.hourly_rate || 0) <= filters.maxPrice;

    const matchesVerified = !filters.verified || (instructor.instructor_details?.is_verified || false);

    const matchesExperience = filters.experience === 'all' || 
      (filters.experience === 'beginner' && (instructor.instructor_details?.years_experience || 0) < 3) ||
      (filters.experience === 'intermediate' && (instructor.instructor_details?.years_experience || 0) >= 3 && (instructor.instructor_details?.years_experience || 0) < 10) ||
      (filters.experience === 'expert' && (instructor.instructor_details?.years_experience || 0) >= 10);

    return matchesSearch && matchesLicense && matchesRating && matchesPrice && matchesVerified && matchesExperience;
  });

  const handleToggleFavorite = (instructorId: string) => {
    setFavorites(prev =>
      prev.includes(instructorId)
        ? prev.filter(id => id !== instructorId)
        : [...prev, instructorId]
    );
  };

  const handleViewDetails = (instructor: Instructor) => {
    if (onSelectInstructor) {
      onSelectInstructor(instructor);
    }
    console.log('View instructor details:', instructor.id);
  };

  const handleBookLesson = (instructor: Instructor) => {
    if (onSelectInstructor) {
      onSelectInstructor(instructor);
    }
    onNavigate('book-lesson');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      licenseType: 'all',
      transmission: 'all',
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Encontre seu Instrutor Ideal
              </h1>
              <p className="text-gray-600 mt-2">
                Conecte-se com os melhores instrutores da sua região
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                onClick={() => onNavigate('favorites')}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="hidden sm:inline">Ver Favoritos ({favorites.length})</span>
                <span className="sm:hidden">Favoritos ({favorites.length})</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg shadow-gray-200/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, cidade..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  showFilters
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-lg'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtros
                {Object.values(filters).some(f => f !== 'all' && f !== 0 && f !== false && f !== 200) && (
                  <span className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Limpar
              </button>
            </div>

            {showFilters && (
              <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtros Avançados
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria CNH
                    </label>
                    <select
                      value={filters.licenseType}
                      onChange={(e) => setFilters({ ...filters, licenseType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Todas as categorias</option>
                      <option value="A">A (Moto)</option>
                      <option value="B">B (Carro)</option>
                      <option value="C">C (Caminhão)</option>
                      <option value="D">D (Ônibus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avaliação Mínima
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Todas as avaliações</option>
                      <option value={3.5}>3.5+ ⭐</option>
                      <option value={4.0}>4.0+ ⭐⭐</option>
                      <option value={4.5}>4.5+ ⭐⭐⭐</option>
                      <option value={4.8}>4.8+ ⭐⭐⭐⭐</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Máximo: <span className="font-bold text-blue-600">R$ {filters.maxPrice}</span>
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="50"
                        max="200"
                        step="10"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>R$ 50</span>
                        <span>R$ 125</span>
                        <span>R$ 200</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experiência
                    </label>
                    <select
                      value={filters.experience}
                      onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Todas</option>
                      <option value="beginner">Iniciante (0-3 anos)</option>
                      <option value="intermediate">Intermediário (3-10 anos)</option>
                      <option value="expert">Expert (10+ anos)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.verified}
                        onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-500"></div>
                      <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700 font-medium">Apenas instrutores verificados</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Premium</span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Limpar Todos
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Instrutores Disponíveis
              </h2>
              <p className="text-gray-600">
                {filteredInstructors.length} {filteredInstructors.length === 1 ? 'instrutor encontrado' : 'instrutores encontrados'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="rating">Melhor Avaliação</option>
                <option value="price_low">Menor Preço</option>
                <option value="price_high">Maior Preço</option>
                <option value="experience">Mais Experiente</option>
                <option value="reviews">Mais Avaliações</option>
              </select>
            </div>
          </div>

          {filteredInstructors.length > 0 ? (
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
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <Search className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Nenhum instrutor encontrado
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Não encontramos instrutores que correspondam aos seus critérios de busca.
                Tente ajustar os filtros ou utilizar termos de busca diferentes.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Limpar Filtros e Busca
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};