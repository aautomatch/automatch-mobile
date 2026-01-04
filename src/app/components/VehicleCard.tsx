import React from 'react';
import { Car, Settings, Wind, CheckCircle, AlertCircle } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: () => void;
  showActions?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onEdit, showActions = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={vehicle.vehicle_image_url || 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          {vehicle.is_available ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Disponível
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Indisponível
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-sm text-gray-600">{vehicle.year} • {vehicle.color}</p>
          </div>
          <div className="text-sm text-gray-600 font-medium">{vehicle.license_plate}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            {vehicle.transmission_type === 'AUTOMATIC' ? 'Automático' : 'Manual'}
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
            {vehicle.category}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Settings className={`w-4 h-4 ${vehicle.has_dual_controls ? 'text-green-600' : 'text-gray-400'}`} />
            <span className={vehicle.has_dual_controls ? 'text-gray-700' : 'text-gray-400'}>
              Controle Duplo
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind className={`w-4 h-4 ${vehicle.has_air_conditioning ? 'text-green-600' : 'text-gray-400'}`} />
            <span className={vehicle.has_air_conditioning ? 'text-gray-700' : 'text-gray-400'}>
              Ar Condicionado
            </span>
          </div>
        </div>

        {vehicle.last_maintenance_date && (
          <p className="text-xs text-gray-500 mb-3">
            Última manutenção: {new Date(vehicle.last_maintenance_date).toLocaleDateString('pt-BR')}
          </p>
        )}

        {showActions && onEdit && (
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Editar Veículo
          </button>
        )}
      </div>
    </div>
  );
};
