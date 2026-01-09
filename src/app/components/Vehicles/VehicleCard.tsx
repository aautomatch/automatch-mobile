import React from 'react';
import { Car, Cog, CheckCircle, XCircle, Calendar, Edit, Eye } from 'lucide-react';

interface VehicleCardProps {
  vehicle: any;
  onViewDetails: (vehicle: any) => void;
  onEdit?: (vehicle: any) => void;
  isInstructor?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onViewDetails, 
  onEdit, 
  isInstructor = false 
}) => {
  const getCategoryLabel = (categoryId: number) => {
    const categories: Record<number, string> = { 
      2: "Hatch", 
      3: "Sedan", 
      4: "SUV",
      5: "Moto",
      6: "Caminhão"
    };
    return categories[categoryId] || "Outro";
  };

  const getTransmissionLabel = (transmissionId: number) => {
    return transmissionId === 1 ? "Manual" : "Automático";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.vehicle_image_url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {!vehicle.is_available && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              INDISPONÍVEL
            </span>
          )}
          {!vehicle.is_approved && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              PENDENTE
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <Cog className="w-3 h-3" />
            {getTransmissionLabel(vehicle.transmission_type_id)}
          </span>
        </div>
      </div>

      <div className="p-4">
        {vehicle.instructor && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100">
              <img
                src={vehicle.instructor.profile_image_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"}
                alt={vehicle.instructor.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600">Instrutor</p>
              <p className="font-medium text-gray-900 truncate">{vehicle.instructor.full_name}</p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-gray-600 text-sm">{vehicle.year} • {vehicle.color}</p>
          <p className="text-gray-800 font-mono text-sm mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
            {vehicle.license_plate}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Categoria</p>
              <p className="text-sm font-medium">{getCategoryLabel(vehicle.category_id)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              {vehicle.has_dual_controls ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-600">Controles Duplos</p>
              <p className="text-sm font-medium">
                {vehicle.has_dual_controls ? "Sim" : "Não"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              {vehicle.has_air_conditioning ? (
                <CheckCircle className="w-4 h-4 text-purple-600" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-600">Ar Condicionado</p>
              <p className="text-sm font-medium">
                {vehicle.has_air_conditioning ? "Sim" : "Não"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Última Manutenção</p>
              <p className="text-sm font-medium">
                {new Date(vehicle.last_maintenance_date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.is_available 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {vehicle.is_available ? "Disponível" : "Indisponível"}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.is_approved 
              ? "bg-blue-100 text-blue-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {vehicle.is_approved ? "Aprovado" : "Aguardando"}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(vehicle)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <Eye className="w-4 h-4 inline mr-1" /> Ver Detalhes
          </button>
          {isInstructor && onEdit && (
            <button 
              onClick={() => onEdit(vehicle)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};