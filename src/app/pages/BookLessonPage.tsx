import React, { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Car, ChevronLeft } from 'lucide-react';
import { mockInstructors, mockVehicles } from '../data/mockData';
import { useNotification } from '../contexts/NotificationContext';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookLessonPageProps {
  onNavigate: (page: string) => void;
  selectedInstructor?: typeof mockInstructors[0];
}

export const BookLessonPage: React.FC<BookLessonPageProps> = ({ onNavigate, selectedInstructor }) => {
  const instructor = selectedInstructor || mockInstructors[0];
  const instructorVehicles = mockVehicles.filter(v => v.instructor_id === instructor.id);
  const { success } = useNotification();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedVehicle, setSelectedVehicle] = useState(instructorVehicles[0]?.id || '');
  const [pickupAddress, setPickupAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  // Generate available time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const totalPrice = (instructor.instructor_details.hourly_rate * duration) / 60;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking lesson:', {
      instructor: instructor.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      vehicle: selectedVehicle,
      pickupAddress,
      notes,
      price: totalPrice
    });
    success('Aula agendada com sucesso!');
    onNavigate('student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => onNavigate('search-instructors')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Agendar Aula
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Escolha a Data
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate.toDateString() === date.toDateString()
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xs text-gray-600">
                        {format(date, 'EEE', { locale: ptBR })}
                      </div>
                      <div className="font-semibold">{format(date, 'd')}</div>
                      <div className="text-xs text-gray-600">
                        {format(date, 'MMM', { locale: ptBR })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Escolha o Horário
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Duração da Aula</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[60, 90, 120].map((min) => (
                    <button
                      key={min}
                      type="button"
                      onClick={() => setDuration(min)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        duration === min
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{min} min</div>
                      <div className="text-sm">
                        R$ {((instructor.instructor_details.hourly_rate * min) / 60).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selection */}
              {instructorVehicles.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    Escolha o Veículo
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {instructorVehicles.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => setSelectedVehicle(vehicle.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedVehicle === vehicle.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-600">{vehicle.license_plate}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {vehicle.transmission_type === 'AUTOMATIC' ? 'Automático' : 'Manual'} • {vehicle.color}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pickup Address */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Local de Encontro
                </h2>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Digite o endereço completo..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Observações (Opcional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma observação para o instrutor?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedTime || !pickupAddress}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Agendamento
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Resumo da Aula</h2>

              {/* Instructor Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={instructor.profile_image_url}
                  alt={instructor.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{instructor.full_name}</p>
                  <p className="text-sm text-gray-600">
                    ⭐ {instructor.instructor_details.average_rating} ({instructor.instructor_details.total_reviews} avaliações)
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 mb-6">
                {selectedDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-medium text-gray-900">
                      {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                    </span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Horário:</span>
                    <span className="font-medium text-gray-900">{selectedTime}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium text-gray-900">{duration} minutos</span>
                </div>
                {selectedVehicle && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Veículo:</span>
                    <span className="font-medium text-gray-900">
                      {instructorVehicles.find(v => v.id === selectedVehicle)?.model}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Valor por hora:</span>
                  <span className="text-gray-900">R$ {instructor.instructor_details.hourly_rate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> O pagamento será processado após a confirmação do instrutor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};