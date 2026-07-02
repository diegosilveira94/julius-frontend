import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/format";
import StatusBadge from "../StatusBadge";

function RecentExpenses({ expenses = [] }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-100">Últimas despesas</h2>
        <Link to="/expenses" className="text-sm text-primary hover:underline">
          Ver todas
        </Link>
      </div>
      {expenses.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma despesa cadastrada.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {expenses.map((exp) => (
            <li key={exp.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <p className="truncate text-gray-100">
                  {exp.description || "Sem descrição"}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(exp.date)} · {exp.Category?.name || "Sem categoria"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={exp.status} />
                <span className="font-medium text-gray-100">
                  {formatCurrency(exp.amount)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentExpenses;
