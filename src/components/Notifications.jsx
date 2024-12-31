import React, { useEffect, useState } from "react";

const Notifications = ({ matchId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${matchId}/subscribe`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    };

    return () => {
      eventSource.close();
    };
  }, [matchId]);

  return (
    <div className="notifications">
      {notifications.map((notif, index) => (
        <div key={index} className="notification">
          <p>{notif.type}</p>
          <p>{JSON.stringify(notif.payload)}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
