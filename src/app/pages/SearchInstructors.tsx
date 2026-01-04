import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, DollarSign, X } from 'lucide-react';
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
    maxPrice: 1000,
    verified: false
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredInstructors = mockInstructors.filter(instructor => {
    const matchesSearch = instructor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.address?.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLicense = filters.licenseType === 'all' ||
      instructor.instructor_details.license_types.includes(filters.licenseType);

    const matchesRating = instructor.instructor_details.average_rating >= filters.minRating;

    const matchesPrice = instructor.instructor_details.hourly_rate <= filters.maxPrice;

    const matchesVerified = !filters.verified || instructor.instructor_details.is_verified;

    return matchesSearch && matchesLicense && matchesRating && matchesPrice && matchesVerified;
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

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Encontre seu Instrutor Ideal
          </h1>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou cidade..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                showFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* License Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria CNH
                  </label>
                  <select
                    value={filters.licenseType}
                    onChange={(e) => setFilters({ ...filters, licenseType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="all">Todas</option>
                    <option value="A">A (Moto)</option>
                    <option value="B">B (Carro)</option>
                    <option value="C">C (Caminhão)</option>
                    <option value="D">D (Ônibus)</option>
                  </select>
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação Mínima
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value={0}>Todas</option>
                    <option value={4.0}>4.0+</option>
                    <option value={4.5}>4.5+</option>
                    <option value={4.8}>4.8+</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço Máximo: R$ {filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="10"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Verified Only */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Apenas Verificados
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setFilters({
                    licenseType: 'all',
                    transmission: 'all',
                    minRating: 0,
                    maxPrice: 1000,
                    verified: false
                  })}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredInstructors.length} {filteredInstructors.length === 1 ? 'instrutor encontrado' : 'instrutores encontrados'}
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>Melhor Avaliação</option>
            <option>Menor Preço</option>
            <option>Maior Preço</option>
            <option>Mais Experiente</option>
          </select>
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
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum instrutor encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou a busca
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  licenseType: 'all',
                  transmission: 'all',
                  minRating: 0,
                  maxPrice: 1000,
                  verified: false
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Limpar Busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
