import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

// Налаштування заголовка авторизації
export const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Очищення заголовка авторизації
export const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};
