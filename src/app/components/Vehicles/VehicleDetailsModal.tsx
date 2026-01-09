import React from 'react';
import { XCircle } from 'lucide-react';

export const VehicleDetailsModal: React.FC<any> = ({
  vehicle,
  onClose,
}) => {
  const getCategoryLabel = (categoryId: number) => {
    const categories: Record<number, string> = { 2: "Hatch", 3: "Sedan", 4: "SUV" };
    return categories[categoryId] || "Outro";
  };

  const getTransmissionLabel = (transmissionId: number) => {
    return transmissionId === 1 ? "Manual" : "Automático";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Imagem */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={vehicle.vehicle_image_url}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informações</h3>
              <div className="space-y-3">
                {[
                  ["Modelo", `${vehicle.brand} ${vehicle.model}`],
                  ["Ano", vehicle.year],
                  ["Cor", vehicle.color],
                  ["Placa", vehicle.license_plate],
                  ["Transmissão", getTransmissionLabel(vehicle.transmission_type_id)],
                  ["Categoria", getCategoryLabel(vehicle.category_id)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-600">{label}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                {[
                  ["Controles Duplos", vehicle.has_dual_controls, vehicle.has_dual_controls ? "green" : "red"],
                  ["Ar Condicionado", vehicle.has_air_conditioning, vehicle.has_air_conditioning ? "green" : "gray"],
                  ["Disponibilidade", vehicle.is_available, vehicle.is_available ? "green" : "red"],
                  ["Aprovação", vehicle.is_approved, vehicle.is_approved ? "blue" : "amber"],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-600">{label}:</span>
                    <span className={`font-medium text-${color}-600`}>
                      {value ? "Sim" : "Não"}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-gray-600">Última Manutenção:</span>
                  <span className="font-medium">
                    {new Date(vehicle.last_maintenance_date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Instrutor */}
          {vehicle.instructor && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Instrutor</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={vehicle.instructor.profile_image_url}
                    alt={vehicle.instructor.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{vehicle.instructor.full_name}</p>
                  <p className="text-gray-600">Instrutor responsável</p>
                </div>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Fechar
            </button>
            {vehicle.is_available && (
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                Agendar Aula
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};