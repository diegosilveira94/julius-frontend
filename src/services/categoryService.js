import api from "./api";

export const categoryService = {
  list: () => api.get("/categories").then((r) => r.data),
  get: (id) => api.get(`/categories/${id}`).then((r) => r.data),
  create: (data) => api.post("/categories", data).then((r) => r.data),
  // Atualização de categoria usa PATCH no backend.
  update: (id, data) => api.patch(`/categories/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/categories/${id}`).then((r) => r.data),
};
