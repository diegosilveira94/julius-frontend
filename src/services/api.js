import axios from "axios";

export const TOKEN_KEY = "julius.token";
export const USER_KEY = "julius.user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Anexa o token JWT (Authorization: Bearer <token>) em toda requisição.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trata erros de forma centralizada:
// - 401: limpa a sessão e redireciona para /login (exceto se já estiver nas telas públicas).
// - Normaliza a mensagem de erro para exibição amigável nos toasts.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = window.location.pathname;

    if (status === 401 && path !== "/login" && path !== "/register") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.assign("/login");
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Erro inesperado. Tente novamente.";

    return Promise.reject(new Error(message));
  }
);

export default api;
