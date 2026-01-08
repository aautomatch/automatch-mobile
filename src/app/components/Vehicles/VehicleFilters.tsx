import React from 'react';
import { Filter, Settings } from 'lucide-react';

interface VehicleFiltersProps {
  filters: any;
  showFilters: boolean;
  onFilterChange: (key: string, value: any) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  showFilters,
  onFilterChange,
  onToggleFilters,
  onClearFilters,
}) => {
  const hasActiveFilters = Object.values(filters).some(filter => 
    filter !== "" && filter !== "all" && filter !== false
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Busca */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por modelo, marca, placa..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.search || ""}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
          </div>
        </div>

        {/* Filtros */}
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Filter className="w-5 h-5" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {/* Limpar */}
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Limpar
        </button>
      </div>

      {/* Filtros avançados */}
      {showFilters && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Filtros Avançados
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Transmissão */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmissão
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.transmission || "all"}
                onChange={(e) => onFilterChange("transmission", e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automático</option>
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.category || "all"}
                onChange={(e) => onFilterChange("category", e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="hatch">Hatch</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="moto">Moto</option>
                <option value="caminhao">Caminhão</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.status || "all"}
                onChange={(e) => onFilterChange("status", e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="available">Disponível</option>
                <option value="unavailable">Indisponível</option>
              </select>
            </div>

            {/* Aprovação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aprovação
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.approval || "all"}
                onChange={(e) => onFilterChange("approval", e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="approved">Aprovados</option>
                <option value="pending">Pendentes</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.dualControls || false}
                onChange={(e) => onFilterChange("dualControls", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">Apenas com controles duplos</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.airConditioning || false}
                onChange={(e) => onFilterChange("airConditioning", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">Apenas com ar condicionado</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};