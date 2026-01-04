import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (type: NotificationType, message: string, duration: number = 5000) => {
    const id = Math.random().toString(36).substring(7);
    const notification: Notification = { id, type, message, duration };
    
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const success = (message: string) => showNotification('success', message);
  const error = (message: string) => showNotification('error', message);
  const warning = (message: string) => showNotification('warning', message);
  const info = (message: string) => showNotification('info', message);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertCircle;
      case 'info':
        return Info;
    }
  };

  const getColors = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, success, error, warning, info }}>
      {children}
      
      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full pointer-events-none">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const colors = getColors(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`${colors} border rounded-lg p-4 shadow-lg pointer-events-auto animate-in slide-in-from-right duration-300`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-sm font-medium">{notification.message}</p>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="flex-shrink-0 hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
