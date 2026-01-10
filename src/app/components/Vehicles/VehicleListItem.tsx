import React from 'react';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';

export const VehicleListItem: React.FC<any> = ({ 
  vehicle, 
  onViewDetails, 
  isInstructor = false 
}) => {
  const getCategoryLabel = (categoryId: number) => {
    const categories: Record<number, string> = { 
      2: "Hatch", 
      3: "Sedan", 
      4: "SUV" 
    };
    return categories[categoryId] || "Outro";
  };

  const getTransmissionLabel = (transmissionId: number) => {
    return transmissionId === 1 ? "Manual" : "Automático";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      {/* container principal */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        
        {/* imagem */}
        <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={vehicle.vehicle_image_url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* conteúdo */}
        <div className="flex-1 min-w-0">
          
          {/* topo */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold text-gray-900">
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className="text-sm text-gray-600">
                {vehicle.year} • {vehicle.color} • {vehicle.license_plate}
              </p>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 sm:items-end">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {getTransmissionLabel(vehicle.transmission_type_id)}
              </span>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                {getCategoryLabel(vehicle.category_id)}
              </span>
            </div>
          </div>

          {/* infos */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-1">
              {vehicle.has_dual_controls ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <span>Controles Duplos</span>
            </div>

            <div className="flex items-center gap-1">
              {vehicle.has_air_conditioning ? (
                <CheckCircle className="w-4 h-4 text-blue-600" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span>Ar Condicionado</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>
                Manutenção:{" "}
                {new Date(vehicle.last_maintenance_date).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* rodapé */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {vehicle.is_available ? "Disponível" : "Indisponível"}
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.is_approved
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {vehicle.is_approved ? "Aprovado" : "Pendente"}
              </div>
            </div>

            <button
              onClick={() => onViewDetails(vehicle)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Ver Detalhes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
