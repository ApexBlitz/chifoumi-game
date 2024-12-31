import api from './api';

export const registerUser = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription.');
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Erreur lors de la connexion.');
  }
};
