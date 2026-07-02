import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import CategoryForm from "../../components/CategoryForm";
import { categoryService } from "../../services/categoryService";
import { useToast } from "../../hooks/useToast";

function Categories() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [removing, setRemoving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryService.list();
      setCategories(data || []);
    } catch (err) {
      toast.error(err.message || "Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(category) {
    setEditing(category);
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
        await categoryService.update(editing.id, values);
        toast.success("Categoria atualizada.");
      } else {
        await categoryService.create(values);
        toast.success("Categoria criada.");
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || "Erro ao salvar categoria.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setRemoving(true);
    try {
      await categoryService.remove(deleting.id);
      toast.success("Categoria excluída.");
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message || "Erro ao excluir categoria.");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Categorias"
        subtitle="Organize suas despesas por categoria"
        action={<Button onClick={openCreate}>Nova categoria</Button>}
      />

      {loading ? (
        <Loading label="Carregando categorias..." />
      ) : categories.length === 0 ? (
        <EmptyState
          title="Nenhuma categoria"
          message="Crie sua primeira categoria para começar a organizar suas despesas."
          action={
            <Button onClick={openCreate} className="mt-2">
              Nova categoria
            </Button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Descrição</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="bg-surface/40 hover:bg-surface">
                  <td className="px-4 py-3 text-gray-100">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {cat.description || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => openEdit(cat)}
                        className="px-3 py-1 text-xs"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setDeleting(cat)}
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
        title={editing ? "Editar categoria" : "Nova categoria"}
        onClose={closeModal}
      >
        <CategoryForm
          key={editing?.id || "new"}
          initialValues={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={saving}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir categoria"
        message={`Tem certeza que deseja excluir "${deleting?.name}"? As despesas ligadas ficarão sem categoria.`}
        confirmLabel="Excluir"
        loading={removing}
        onConfirm={handleDelete}
        onCancel={() => !removing && setDeleting(null)}
      />
    </div>
  );
}

export default Categories;
