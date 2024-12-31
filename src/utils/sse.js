export const subscribeToMatchEvents = (matchId, onEvent) => {
    const eventSource = new EventSource(`/matches/${matchId}/subscribe`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  
    eventSource.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data);
      onEvent(parsedEvent);
    };
  
    eventSource.onerror = (error) => {
      console.error('Erreur SSE:', error);
      eventSource.close();
    };
  
    return eventSource;
  };
  