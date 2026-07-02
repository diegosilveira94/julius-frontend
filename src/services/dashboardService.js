import api from "./api";

export const dashboardService = {
  // GET /dashboard/total-expenses -> { total }
  totalExpenses: () => api.get("/dashboard/total-expenses").then((r) => r.data),
  // GET /dashboard/expenses-count -> { count }
  expensesCount: () => api.get("/dashboard/expenses-count").then((r) => r.data),
  // GET /dashboard/expenses-by-category -> [{ category, total }]
  expensesByCategory: () =>
    api.get("/dashboard/expenses-by-category").then((r) => r.data),
};
