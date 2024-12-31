export const subscribeToMatchNotifications = (matchId, callback) => {
    const eventSource = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${matchId}/subscribe`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  
    eventSource.onerror = (error) => {
      console.error('Erreur de connexion à SSE', error);
      eventSource.close();
    };
  
    return eventSource;
  };
  