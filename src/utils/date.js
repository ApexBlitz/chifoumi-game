export const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const timeRemaining = new Date(endDate) - now;
    const minutes = Math.floor(timeRemaining / 1000 / 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    return { minutes, seconds };
  };
  
  export const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  