import api from "./api";

// Remove campos vazios para não enviar filtros em branco na query string.
function cleanParams(filters = {}) {
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params[key] = value;
    }
  });
  return params;
}

export const expenseService = {
  // Filtros suportados: status, categoryId, minAmount, maxAmount, startDate, endDate
  list: (filters = {}) =>
    api.get("/expenses", { params: cleanParams(filters) }).then((r) => r.data),
  get: (id) => api.get(`/expenses/${id}`).then((r) => r.data),
  create: (data) => api.post("/expenses", data).then((r) => r.data),
  // Atualização de despesa usa PUT no backend.
  update: (id, data) => api.put(`/expenses/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/expenses/${id}`).then((r) => r.data),
};
