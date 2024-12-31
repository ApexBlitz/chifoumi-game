import React, { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToMatchEvents } from './sse';
import { Notification } from '@mui/material'; // Si vous utilisez MUI pour les notifications
import { useHistory } from 'react-router-dom';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const matchId = 'votre_match_id'; 
    const eventSource = subscribeToMatchEvents(matchId, (event) => {
      setNotifications((prev) => [...prev, event]);
      if (event.type === 'MATCH_ENDED') {
        history.push('/matches'); 
      }
    });

    return () => {
      eventSource.close();
    };
  }, [history]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
      <div>
        {notifications.map((notification, index) => (
          <Notification key={index} message={notification.payload.message} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
