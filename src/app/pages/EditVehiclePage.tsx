import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  Save,
  Upload,
  Trash2,
  Car,
  CheckCircle,
  AlertCircle,
  Settings,
  Shield,
  Wrench,
  X,
  ChevronRight,
} from "lucide-react";

interface EditVehiclePageProps {
  onNavigate?: (page: string) => void;
  vehicleId?: string;
  onClose?: () => void;
}

export const EditVehiclePage: React.FC<EditVehiclePageProps> = ({
  onNavigate,
  vehicleId,
  onClose,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    license_plate: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    transmission_type_id: 1,
    category_id: 2,
    has_dual_controls: true,
    has_air_conditioning: true,
    is_available: true,
    last_maintenance_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const mockVehicle = {
    id: vehicleId || "1",
    license_plate: "ABC-1234",
    brand: "Volkswagen",
    model: "Golf",
    year: 2023,
    color: "Prata",
    vehicle_image_url:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    transmission_type_id: 1,
    category_id: 2,
    has_dual_controls: true,
    has_air_conditioning: true,
    is_available: true,
    last_maintenance_date: "2024-01-15",
    instructor_id: user?.id,
  };

  useEffect(() => {
    if (vehicleId) {
      setLoading(true);
      setTimeout(() => {
        setFormData({
          license_plate: mockVehicle.license_plate,
          brand: mockVehicle.brand,
          model: mockVehicle.model,
          year: mockVehicle.year,
          color: mockVehicle.color,
          transmission_type_id: mockVehicle.transmission_type_id,
          category_id: mockVehicle.category_id,
          has_dual_controls: mockVehicle.has_dual_controls,
          has_air_conditioning: mockVehicle.has_air_conditioning,
          is_available: mockVehicle.is_available,
          last_maintenance_date: mockVehicle.last_maintenance_date,
          notes: "",
        });
        setImagePreview(mockVehicle.vehicle_image_url);
        setLoading(false);
      }, 500);
    }
  }, [vehicleId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.license_plate.trim()) {
      newErrors.license_plate = "Placa é obrigatória";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Marca é obrigatória";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Modelo é obrigatório";
    }

    if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = "Ano inválido";
    }

    if (!formData.color.trim()) {
      newErrors.color = "Cor é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    setTimeout(() => {
      console.log("Dados do veículo:", formData);
      setSaving(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        if (onNavigate) {
          onNavigate("vehicles");
        }
      }, 2000);
    }, 1500);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita."
      )
    ) {
      console.log("Excluir veículo:", vehicleId);
      if (onNavigate) {
        onNavigate("vehicles");
      }
    }
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    } else if (onNavigate) {
      onNavigate("vehicles");
    }
  };

  const categories = [
    { id: 2, name: "Hatch" },
    { id: 3, name: "Sedan" },
    { id: 4, name: "SUV" },
    { id: 5, name: "Moto" },
    { id: 6, name: "Caminhão" },
  ];

  const transmissions = [
    { id: 1, name: "Manual" },
    { id: 2, name: "Automático" },
  ];

  const colors = [
    "Prata",
    "Preto",
    "Branco",
    "Cinza",
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Marrom",
    "Laranja",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Car className="w-8 h-8 text-blue-600" />
                  {vehicleId ? "Editar Veículo" : "Adicionar Veículo"}
                </h1>
                <p className="text-gray-600 mt-2">
                  {vehicleId
                    ? "Atualize as informações do seu veículo"
                    : "Cadastre um novo veículo para suas aulas"}
                </p>
              </div>
            </div>

            {vehicleId && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span className="hidden sm:inline">Excluir Veículo</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] w-full"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {vehicleId ? "Edição" : "Cadastro"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Informações do Veículo
                    </h2>
                    <p className="text-gray-600">Dados principais do veículo</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placa *
                    </label>
                    <input
                      type="text"
                      name="license_plate"
                      value={formData.license_plate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.license_plate
                          ? "border-red-300"
                          : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="ABC-1234"
                    />
                    {errors.license_plate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.license_plate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.brand ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Ex: Volkswagen"
                    />
                    {errors.brand && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.brand}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.model ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Ex: Golf"
                    />
                    {errors.model && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.model}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.year ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.year}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor *
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.color ? "border-red-300" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Selecione uma cor</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                    {errors.color && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.color}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmissão *
                    </label>
                    <select
                      name="transmission_type_id"
                      value={formData.transmission_type_id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {transmissions.map((trans) => (
                        <option key={trans.id} value={trans.id}>
                          {trans.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Última Manutenção
                    </label>
                    <input
                      type="date"
                      name="last_maintenance_date"
                      value={formData.last_maintenance_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Configurações
                    </h2>
                    <p className="text-gray-600">Equipamentos e status</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="has_dual_controls"
                          checked={formData.has_dual_controls}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-500"></div>
                        <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Controles Duplos
                        </span>
                        <p className="text-sm text-gray-500">
                          Veículo adaptado para aulas
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="has_air_conditioning"
                          checked={formData.has_air_conditioning}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 transition-all group-hover:border-green-500"></div>
                        <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Ar Condicionado
                        </span>
                        <p className="text-sm text-gray-500">
                          Climatização disponível
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="is_available"
                          checked={formData.is_available}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 transition-all group-hover:border-green-500"></div>
                        <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Disponível para Aulas
                        </span>
                        <p className="text-sm text-gray-500">
                          Veículo ativo para agendamentos
                        </p>
                      </div>
                    </label>

                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          Status de Aprovação
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-gray-700">
                          Veículo aprovado para uso
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Observações
                    </h2>
                    <p className="text-gray-600">
                      Informações adicionais sobre o veículo
                    </p>
                  </div>
                </div>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Descreva características especiais, histórico de manutenção, observações importantes..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Imagem do Veículo
                </h3>

                <div className="mb-4">
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 mb-3">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview do veículo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <label className="block">
                    <div className="cursor-pointer w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl font-medium border border-gray-200 hover:border-blue-400 hover:from-gray-100 hover:to-blue-100 transition-all duration-300 flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      {imagePreview ? "Alterar Imagem" : "Upload de Imagem"}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Formatos: JPG, PNG, WebP • Máx: 5MB
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Placa:</span>
                    <span className="font-medium">
                      {formData.license_plate || "Não informada"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Veículo:</span>
                    <span className="font-medium">
                      {formData.brand} {formData.model}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ano/Cor:</span>
                    <span className="font-medium">
                      {formData.year} • {formData.color}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Transmissão:</span>
                    <span className="font-medium">
                      {formData.transmission_type_id === 1
                        ? "Manual"
                        : "Automático"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium ${
                        formData.is_available
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formData.is_available ? "Disponível" : "Indisponível"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#2E5A88]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {vehicleId ? "Atualizar Veículo" : "Cadastrar Veículo"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-800">Importante</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>
                      Certifique-se de que todas as informações estão corretas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>
                      Veículos devem passar por aprovação da plataforma
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Manutenção em dia é obrigatória</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {vehicleId ? "Veículo Atualizado!" : "Veículo Cadastrado!"}
            </h3>

            <p className="text-gray-600 mb-6">
              {vehicleId
                ? "As informações do veículo foram atualizadas com sucesso."
                : "Seu veículo foi cadastrado e está em análise para aprovação."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  if (onNavigate) {
                    onNavigate("vehicles");
                  }
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5 inline mr-2" />
                Ver Veículos
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
