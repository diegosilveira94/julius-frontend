import { formatCurrency } from "../../utils/format";

// Exibe gastos por categoria como barras proporcionais (sem lib de gráfico).
function CategoryBreakdown({ data = [] }) {
  const items = [...data].sort((a, b) => Number(b.total) - Number(a.total));
  const max = Math.max(...items.map((i) => Number(i.total) || 0), 1);

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">
        Gastos por categoria
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum gasto registrado ainda.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const value = Number(item.total) || 0;
            const pct = Math.round((value / max) * 100);
            return (
              <li key={item.category || "sem-categoria"}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.category || "Sem categoria"}
                  </span>
                  <span className="font-medium text-gray-100">
                    {formatCurrency(value)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategoryBreakdown;
