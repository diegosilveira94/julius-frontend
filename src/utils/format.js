// O backend retorna amount como string decimal (ex.: "250.50").
export function formatCurrency(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

// Converte "YYYY-MM-DD" (ou ISO) para "DD/MM/AAAA" sem sofrer com fuso horário.
export function formatDate(value) {
  if (!value) return "-";
  const datePart = String(value).slice(0, 10);
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return String(value);
  return `${day}/${month}/${year}`;
}

// Data de hoje em "YYYY-MM-DD" (para valor padrão de <input type="date">).
export function todayISO() {
  return new Date().toLocaleDateString("en-CA");
}
