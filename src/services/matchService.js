import api from './api';

export const getMatches = async () => {
  try {
    const response = await api.get('/matches');
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des matchs.');
  }
};

export const createMatch = async () => {
  try {
    const response = await api.post('/matches');
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la création du match.');
  }
};

export const joinMatch = async (matchId) => {
  try {
    const response = await api.post(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la jonction au match.');
  }
};

export const makeMove = async (matchId, turnId, move) => {
  try {
    const response = await api.post(`/matches/${matchId}/turns/${turnId}`, { move });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors du déplacement.');
  }
};
