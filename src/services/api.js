import axios from "axios";

const API_URL = "http://fauques.freeboxos.fr:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (username, password) => {
  try {
    const response = await api.post("/register", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const getMatches = async () => {
  try {
    const response = await api.get("/matches");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMatch = async () => {
  try {
    const response = await api.post("/matches");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinMatch = async (matchId) => {
  try {
    const response = await api.post(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
