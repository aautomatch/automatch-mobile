import React, { useState } from "react";
import {
  X,
  Clock,
  Calendar,
  Plus,
  Trash2,
  Save,
  AlertCircle,
} from "lucide-react";

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slots: AvailabilitySlot[]) => void;
  existingSlots?: AvailabilitySlot[];
}

const daysOfWeek = [
  { id: 0, name: "Domingo", short: "Dom" },
  { id: 1, name: "Segunda-feira", short: "Seg" },
  { id: 2, name: "Terça-feira", short: "Ter" },
  { id: 3, name: "Quarta-feira", short: "Qua" },
  { id: 4, name: "Quinta-feira", short: "Qui" },
  { id: 5, name: "Sexta-feira", short: "Sex" },
  { id: 6, name: "Sábado", short: "Sáb" },
];

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingSlots = [],
}) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(existingSlots);
  const [selectedDay, setSelectedDay] = useState<number>(1); // Segunda-feira
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleAddSlot = () => {
    if (startTime >= endTime) {
      alert("Horário de início deve ser anterior ao horário de término");
      return;
    }

    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      day_of_week: selectedDay,
      start_time: startTime,
      end_time: endTime,
    };

    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(slots);
      setSaving(false);
      onClose();
    }, 1000);
  };

  const getSlotsForDay = (dayId: number) => {
    return slots.filter((slot) => slot.day_of_week === dayId);
  };

  const formatTimeRange = (start: string, end: string) => {
    return `${start} às ${end}`;
  };

  const getDayName = (dayId: number) => {
    return daysOfWeek.find((day) => day.id === dayId)?.name || "";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center md:justify-center p-0 md:p-4">
      <div className="bg-white w-full h-[100dvh] md:h-auto md:max-w-4xl md:max-h-[90vh] rounded-t-2xl md:rounded-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Disponibilidade
              </h2>
              <p className="text-gray-600">
                Defina seus horários disponíveis para aulas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Adicionar Horário
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dia da Semana
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day.id} value={day.id}>
                      {day.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário de Início
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário de Término
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddSlot}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#2E5A88]/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Horário
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Horários Configurados ({slots.length})
            </h3>

            {slots.length === 0 ? (
              <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-dashed border-gray-300">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Nenhum horário configurado ainda
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Adicione seus horários disponíveis acima
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {daysOfWeek.map((day) => {
                  const daySlots = getSlotsForDay(day.id);
                  if (daySlots.length === 0) return null;

                  return (
                    <div
                      key={day.id}
                      className="bg-white rounded-xl border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          <span className="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                            {day.short}
                          </span>
                          {day.name}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {daySlots.length} horário(s)
                        </span>
                      </div>

                      <div className="space-y-2">
                        {daySlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg hover:bg-blue-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-900">
                                {formatTimeRange(
                                  slot.start_time,
                                  slot.end_time
                                )}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveSlot(slot.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold text-amber-800">Recomendações</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Mantenha pelo menos 1 hora de intervalo entre aulas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>
                  Considere horários de pico de trânsito na sua região
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Atualize sua disponibilidade semanalmente</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#2E5A88]/25 transition-all duration-300   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 "
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="leading-none">Salvar Disponibilidade</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
