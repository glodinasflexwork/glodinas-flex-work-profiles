import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Notification component for job alerts and system messages
const Notification = ({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    let timer;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, autoCloseTime, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// NotificationProvider to manage notifications throughout the app
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(0);

  const addNotification = (message, type = 'info', autoClose = true, autoCloseTime = 5000) => {
    const id = notificationId;
    setNotifications(prev => [...prev, { id, message, type, autoClose, autoCloseTime }]);
    setNotificationId(prev => prev + 1);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            isVisible={true}
            autoClose={notification.autoClose}
            autoCloseTime={notification.autoCloseTime}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Context for notifications
import { createContext, useContext } from 'react';

const NotificationContext = createContext();

// Hook to use notifications in any component
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// JobAlert component for job-specific notifications
export const JobAlert = ({ job, onView, onDismiss }) => {
  return (
    <div className="notification notification-info">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">
            New job match: {job.title}
          </p>
          <p className="mt-1 text-sm text-white opacity-80">
            {job.company} • {job.location}
          </p>
          <div className="mt-2 flex space-x-3">
            <button
              onClick={onView}
              className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none"
            >
              View Details
            </button>
            <button
              onClick={onDismiss}
              className="bg-white bg-opacity-10 px-2 py-1 rounded text-xs font-medium text-white hover:bg-opacity-20 focus:outline-none"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
