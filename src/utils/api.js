import axios from 'axios';

const apiUrl = 'http://fauques.freeboxos.fr:3000';  

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription');
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username,
      password
    });
    return response.data.token;
  } catch (error) {
    throw new Error('Erreur lors de la connexion');
  }
};

export const getMatches = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/matches`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des matchs');
  }
};

export const createMatch = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/matches`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la création du match');
  }
};
