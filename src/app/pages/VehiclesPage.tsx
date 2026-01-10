import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Car, Plus, Filter } from "lucide-react";
import { VehicleCard } from "../components/Vehicles/VehicleCard";
import { VehicleListItem } from "../components/Vehicles/VehicleListItem";
import { VehicleFilters } from "../components/Vehicles/VehicleFilters";
import { VehicleDetailsModal } from "../components/Vehicles/VehicleDetailsModal";
import { EmptyState } from "../components/Vehicles/EmptyState";

const MOCK_VEHICLES = [
  {
    id: "1",
    license_plate: "ABC-1234",
    model: "Golf",
    brand: "Volkswagen",
    year: 2023,
    color: "Prata",
    vehicle_image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    transmission_type_id: 1,
    category_id: 2,
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: true,
    last_maintenance_date: "2024-01-15",
    instructor_id: "1", 
    instructor: {
      id: "1",
      full_name: "Carlos Silva",
      profile_image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
  },
  {
    id: "2",
    license_plate: "DEF-5678",
    model: "Corolla",
    brand: "Toyota",
    year: 2022,
    color: "Branco",
    vehicle_image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
    transmission_type_id: 2,
    category_id: 3,
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: true,
    last_maintenance_date: "2024-01-10",
    instructor_id: "inst2",
    instructor: {
      id: "inst2",
      full_name: "Ana Santos",
      profile_image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
  },
  {
    id: "3",
    license_plate: "GHI-9012",
    model: "Compass",
    brand: "Jeep",
    year: 2023,
    color: "Preto",
    vehicle_image_url: "https://images.unsplash.com/photo-1563720223488-8f2f62a6e71a?w=800",
    transmission_type_id: 2,
    category_id: 4,
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: false,
    last_maintenance_date: "2024-01-05",
    instructor_id: "1", 
    instructor: {
      id: "1",
      full_name: "Carlos Silva",
      profile_image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
  },
];

interface VehiclesPageProps {
  onNavigate?: (page: string) => void;
  onSelectInstructor?: (instructor: any) => void;
}

export const VehiclesPage: React.FC<VehiclesPageProps> = ({ 
  onNavigate,
  onSelectInstructor 
}) => {
  const { user, isInstructor } = useAuth();
  const [allVehicles] = useState(MOCK_VEHICLES);
  const [userVehicles, setUserVehicles] = useState<any[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [filters, setFilters] = useState({
    search: "",
    transmission: "all",
    category: "all",
    status: "all",
    approval: "all",
    dualControls: false,
    airConditioning: false,
  });

  useEffect(() => {
    if (isInstructor) {
      const instructorVehicles = allVehicles.filter(
        vehicle => vehicle.instructor_id === user?.id
      );
      setUserVehicles(instructorVehicles);
      setFilteredVehicles(instructorVehicles);
    } else {
      setUserVehicles(allVehicles);
      setFilteredVehicles(allVehicles);
    }
  }, [allVehicles, user?.id, isInstructor]);

  const handleNavigate = (page: string, data?: any) => {
    if (onNavigate) {
      if (data) {
        localStorage.setItem('selectedVehicle', JSON.stringify(data));
      }
      onNavigate(page);
    }
  };

  useEffect(() => {
    let filtered = [...userVehicles];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.model?.toLowerCase().includes(searchLower) ||
          v.brand?.toLowerCase().includes(searchLower) ||
          v.license_plate?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.transmission !== "all") {
      const id = filters.transmission === "manual" ? 1 : 2;
      filtered = filtered.filter(v => v.transmission_type_id === id);
    }

    if (filters.category !== "all") {
      const categoryMap: Record<string, number> = {
        hatch: 2,
        sedan: 3,
        suv: 4,
      };
      const categoryId = categoryMap[filters.category];
      filtered = filtered.filter(v => v.category_id === categoryId);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(v =>
        filters.status === "available" ? v.is_available : !v.is_available
      );
    }

    if (filters.approval !== "all") {
      filtered = filtered.filter(v =>
        filters.approval === "approved" ? v.is_approved : !v.is_approved
      );
    }

    if (filters.dualControls) {
      filtered = filtered.filter(v => v.has_dual_controls);
    }

    if (filters.airConditioning) {
      filtered = filtered.filter(v => v.has_air_conditioning);
    }

    setFilteredVehicles(filtered);
  }, [filters, userVehicles]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      transmission: "all",
      category: "all",
      status: "all",
      approval: "all",
      dualControls: false,
      airConditioning: false,
    });
  };

  const stats = {
    total: userVehicles.length,
    available: userVehicles.filter(v => v.is_available).length,
    pendingApproval: userVehicles.filter(v => !v.is_approved).length,
    withAirConditioning: userVehicles.filter(v => v.has_air_conditioning).length,
  };

  const handleScheduleLesson = (vehicle: any) => {
    if (onSelectInstructor && vehicle.instructor) {
      onSelectInstructor(vehicle.instructor);
      handleNavigate("book-lesson", vehicle);
    } else {
      handleNavigate("book-lesson", vehicle);
    }
  };

const handleEditVehicle = (vehicle: any) => {
  if (isInstructor && vehicle.instructor_id === user?.id) {
    localStorage.setItem('selectedVehicleId', vehicle.id);
    localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
    handleNavigate("edit-vehicle");
  }
};

  const getPageTitle = () => {
    if (isInstructor) {
      return "Meus Veículos";
    }
  };

  const getPageDescription = () => {
    if (isInstructor) {
      return "Gerencie seus veículos para aulas";
    }
    return "Veículos disponíveis para agendar aulas";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Car className="w-8 h-8 text-blue-600" />
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 mt-2">
                {getPageDescription()} • {filteredVehicles.length} veículos encontrados
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg font-medium ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg font-medium ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"}`}
                >
                  Lista
                </button>
              </div>

              {isInstructor && (
                <button 
                  onClick={() => handleNavigate("add-vehicle")}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-lg hover:shadow-lg hover:shadow-[#2E5A88]/25 transition-all duration-300 group"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Adicionar Veículo</span>
                </button>
              )}
            </div>
          </div>

          <VehicleFilters
            filters={filters}
            showFilters={showFilters}
            onFilterChange={handleFilterChange}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onClearFilters={clearFilters}
          />
        </div>

        {isInstructor && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                label: "Total", 
                value: stats.total, 
                color: "blue",
                bg: "from-blue-50 to-blue-100",
                border: "border-blue-200",
                text: "text-blue-800"
              },
              { 
                label: "Disponíveis", 
                value: stats.available, 
                color: "green",
                bg: "from-green-50 to-green-100",
                border: "border-green-200",
                text: "text-green-800"
              },
              { 
                label: "Pendentes", 
                value: stats.pendingApproval, 
                color: "amber",
                bg: "from-amber-50 to-amber-100",
                border: "border-amber-200",
                text: "text-amber-800"
              },
              { 
                label: "Com Ar Cond.", 
                value: stats.withAirConditioning, 
                color: "purple",
                bg: "from-purple-50 to-purple-100",
                border: "border-purple-200",
                text: "text-purple-800"
              },
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.bg} ${stat.border} border rounded-2xl p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${stat.text}`}>{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Car className={`w-12 h-12 text-${stat.color}-600 opacity-50`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lista de Veículos */}
        {filteredVehicles.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={setSelectedVehicle}
                  onEdit={isInstructor && vehicle.instructor_id === user?.id ? handleEditVehicle : undefined}
                  isInstructor={isInstructor}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVehicles.map((vehicle) => (
                <VehicleListItem
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={setSelectedVehicle}
                  onEdit={isInstructor && vehicle.instructor_id === user?.id ? handleEditVehicle : undefined}
                  onSchedule={!isInstructor ? () => handleScheduleLesson(vehicle) : undefined}
                  isInstructor={isInstructor}
                  showInstructorInfo={!isInstructor}
                />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            title={isInstructor ? "Nenhum veículo cadastrado" : "Nenhum veículo encontrado"}
            description={
              isInstructor 
                ? "Você ainda não cadastrou nenhum veículo. Comece adicionando seu primeiro veículo!"
                : "Não encontramos veículos que correspondam aos seus filtros."
            }
            actionText={isInstructor ? "Adicionar Primeiro Veículo" : "Limpar Filtros"}
            onAction={isInstructor ? () => handleNavigate("add-vehicle") : clearFilters}
          />
        )}

        {/* Modal de Detalhes */}
        {selectedVehicle && (
          <VehicleDetailsModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            onScheduleLesson={!isInstructor ? () => {
              handleScheduleLesson(selectedVehicle);
              setSelectedVehicle(null);
            } : undefined}
            showScheduleButton={!isInstructor}
          />
        )}
      </div>
    </div>
  );
};