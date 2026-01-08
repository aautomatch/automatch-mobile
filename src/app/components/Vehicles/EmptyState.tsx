import React from 'react';
import { Car } from 'lucide-react';

export const EmptyState: React.FC<any> = ({
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
      <Car className="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-8">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};