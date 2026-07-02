import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import StatusBadge from "../../components/StatusBadge";
import ExpenseForm from "../../components/ExpenseForm";
import ExpenseFilters from "../../components/ExpenseFilters";
import { expenseService } from "../../services/expenseService";
import { categoryService } from "../../services/categoryService";
import { useToast } from "../../hooks/useToast";
import { formatCurrency, formatDate } from "../../utils/format";

const EMPTY_FILTERS = {
  categoryId: "",
  status: "",
  minAmount: "",
  maxAmount: "",
  startDate: "",
  endDate: "",
};

function Expenses() {
  const toast = useToast();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [removing, setRemoving] = useState(false);

  const loadExpenses = useCallback(
    async (activeFilters) => {
      setLoading(true);
      try {
        const data = await expenseService.list(activeFilters);
        setExpenses(data || []);
      } catch (err) {
        toast.error(err.message || "Erro ao carregar despesas.");
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  // Carrega categorias uma vez (para o select do formulário e dos filtros).
  useEffect(() => {
    categoryService
      .list()
      .then((data) => setCategories(data || []))
      .catch(() => {});
  }, []);

  // Recarrega despesas quando os filtros mudam (com debounce para evitar flood).
  useEffect(() => {
    const timer = setTimeout(() => loadExpenses(filters), 300);
    return () => clearTimeout(timer);
  }, [filters, loadExpenses]);

  function openCreate() {
    if (categories.length === 0) {
      toast.info("Crie uma categoria antes de adicionar despesas.");
      return;
    }
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(expense) {
    setEditing(expense);
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
  }

  async function handleSubmit(values) {
    setSaving(true);
    try {
      if (editing) {
        await expenseService.update(editing.id, values);
        toast.success("Despesa atualizada.");
      } else {
        await expenseService.create(values);
        toast.success("Despesa criada.");
      }
      setModalOpen(false);
      setEditing(null);
      loadExpenses(filters);
    } catch (err) {
      toast.error(err.message || "Erro ao salvar despesa.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setRemoving(true);
    try {
      await expenseService.remove(deleting.id);
      toast.success("Despesa excluída.");
      setDeleting(null);
      loadExpenses(filters);
    } catch (err) {
      toast.error(err.message || "Erro ao excluir despesa.");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Despesas"
        subtitle="Gerencie suas despesas"
        action={<Button onClick={openCreate}>Nova despesa</Button>}
      />

      <ExpenseFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
      />

      {loading ? (
        <Loading label="Carregando despesas..." />
      ) : expenses.length === 0 ? (
        <EmptyState
          title="Nenhuma despesa encontrada"
          message="Ajuste os filtros ou cadastre uma nova despesa."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Descrição</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 text-right font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expenses.map((exp) => (
                <tr key={exp.id} className="bg-surface/40 hover:bg-surface">
                  <td className="px-4 py-3 text-gray-100">
                    {exp.description || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {exp.Category?.name || "Sem categoria"}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(exp.date)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-100">
                    {formatCurrency(exp.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={exp.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => openEdit(exp)}
                        className="px-3 py-1 text-xs"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setDeleting(exp)}
                        className="px-3 py-1 text-xs"
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? "Editar despesa" : "Nova despesa"}
        onClose={closeModal}
      >
        <ExpenseForm
          key={editing?.id || "new"}
          initialValues={editing}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={saving}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir despesa"
        message={`Deseja excluir a despesa "${deleting?.description}"?`}
        confirmLabel="Excluir"
        loading={removing}
        onConfirm={handleDelete}
        onCancel={() => !removing && setDeleting(null)}
      />
    </div>
  );
}

export default Expenses;
