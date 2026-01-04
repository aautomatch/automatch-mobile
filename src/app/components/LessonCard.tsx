import React from 'react';
import { Calendar, Clock, MapPin, DollarSign, CheckCircle, XCircle, AlertCircle, User, Car } from 'lucide-react';
import { Lesson, Instructor } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LessonCardProps {
  lesson: Lesson;
  instructor?: Instructor;
  onCancel?: () => void;
  onReview?: () => void;
  onPay?: () => void;
  showInstructor?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  instructor,
  onCancel,
  onReview,
  onPay,
  showInstructor = true,
}) => {
  const getStatusConfig = () => {
    switch (lesson.status) {
      case 'SCHEDULED':
        return { icon: Calendar, color: 'blue', text: 'Agendada' };
      case 'COMPLETED':
        return { icon: CheckCircle, color: 'green', text: 'Concluída' };
      case 'CANCELLED':
        return { icon: XCircle, color: 'red', text: 'Cancelada' };
      default:
        return { icon: AlertCircle, color: 'gray', text: 'Desconhecido' };
    }
  };

  const getPaymentStatusConfig = () => {
    switch (lesson.payment_status) {
      case 'PAID':
        return { color: 'green', text: 'Pago' };
      case 'PENDING':
        return { color: 'yellow', text: 'Pendente' };
      case 'REFUNDED':
        return { color: 'gray', text: 'Reembolsado' };
      default:
        return { color: 'gray', text: 'Desconhecido' };
    }
  };

  const statusConfig = getStatusConfig();
  const paymentConfig = getPaymentStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 text-${statusConfig.color}-600`} />
          <span className={`font-medium text-${statusConfig.color}-600`}>{statusConfig.text}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${paymentConfig.color}-100 text-${paymentConfig.color}-700`}>
          {paymentConfig.text}
        </div>
      </div>

      {showInstructor && instructor && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <img
            src={instructor.profile_image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
            alt={instructor.full_name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{instructor.full_name}</p>
            <p className="text-sm text-gray-600">Instrutor</p>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span>{format(new Date(lesson.scheduled_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Clock className="w-5 h-5 text-gray-400" />
          <span>{format(new Date(lesson.scheduled_at), 'HH:mm')} ({lesson.duration_minutes} min)</span>
        </div>
        {lesson.address && (
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>{lesson.address.street}, {lesson.address.number} - {lesson.address.neighborhood}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-gray-700">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="font-medium">R$ {lesson.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {lesson.status === 'SCHEDULED' && lesson.payment_status === 'PENDING' && onPay && (
          <button
            onClick={onPay}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Pagar
          </button>
        )}
        {lesson.status === 'COMPLETED' && onReview && (
          <button
            onClick={onReview}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Avaliar
          </button>
        )}
        {lesson.status === 'SCHEDULED' && onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};
