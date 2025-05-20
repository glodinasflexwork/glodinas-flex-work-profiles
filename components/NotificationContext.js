import React, { createContext, useState, useContext } from 'react';
import Notification from './Notification';

// Create a context for notifications
const NotificationContext = createContext();

// Provider component that wraps the app
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (message, type = 'info', autoClose = true, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = {
      id,
      message,
      type,
      autoClose,
      duration
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (autoClose) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  };

  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

// Custom hook to use the notification context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
