import React, { createContext, useState, useContext } from 'react';
import Notification from './Notification';

// Create a context for notifications
const NotificationContext = createContext();

// Provider component that wraps the app
export function NotificationProvider({ children }) {
  // Check if we're running on the server during static generation
  const isSSR = typeof window === 'undefined';
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (message, type = 'info', autoClose = true, duration = 5000) => {
    // Skip notifications during server-side rendering
    if (isSSR) return '';
    
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
    // Skip during server-side rendering
    if (isSSR) return;
    
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {!isSSR && (
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
      )}
    </NotificationContext.Provider>
  );
}

// Custom hook to use the notification context
export function useNotification() {
  // Check if we're running on the server during static generation
  const isSSR = typeof window === 'undefined';
  
  // During SSR, return dummy functions to prevent errors
  if (isSSR) {
    return {
      addNotification: () => '',
      removeNotification: () => {}
    };
  }
  
  const context = useContext(NotificationContext);
  if (!context) {
    // Instead of throwing an error, return dummy functions during SSR
    return {
      addNotification: () => '',
      removeNotification: () => {}
    };
  }
  return context;
}
