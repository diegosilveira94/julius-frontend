import api from "./api";

export const authService = {
  // POST /auth/login -> { token, user: { id, email, name } }
  login: (credentials) => api.post("/auth/login", credentials).then((r) => r.data),

  // POST /users (cadastro) -> { id, email, name, ... }
  register: (data) => api.post("/users", data).then((r) => r.data),
};
