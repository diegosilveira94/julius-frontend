import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import Loading from "../../components/Loading";
import CategoryBreakdown from "../../components/CategoryBreakdown";
import RecentExpenses from "../../components/RecentExpenses";
import { dashboardService } from "../../services/dashboardService";
import { expenseService } from "../../services/expenseService";
import { useToast } from "../../hooks/useToast";
import { formatCurrency } from "../../utils/format";

function Dashboard() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [byCategory, setByCategory] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      try {
        const [totalRes, countRes, byCategoryRes, expensesRes] = await Promise.all([
          dashboardService.totalExpenses(),
          dashboardService.expensesCount(),
          dashboardService.expensesByCategory(),
          expenseService.list(),
        ]);
        if (!active) return;
        setTotal(Number(totalRes.total) || 0);
        setCount(Number(countRes.count) || 0);
        setByCategory(byCategoryRes || []);
        const sorted = [...(expensesRes || [])].sort(
          (a, b) =>
            new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
        );
        setRecent(sorted.slice(0, 5));
      } catch (err) {
        if (active) toast.error(err.message || "Erro ao carregar o dashboard.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [toast]);

  if (loading) return <Loading label="Carregando dashboard..." />;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumo das suas despesas" />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total de gastos"
          value={formatCurrency(total)}
          icon="/money.svg"
          accent="text-secondary"
        />
        <StatCard
          label="Quantidade de despesas"
          value={count}
          icon="/expense.svg"
          accent="text-primary"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <CategoryBreakdown data={byCategory} />
        <RecentExpenses expenses={recent} />
      </div>
    </div>
  );
}

export default Dashboard;
