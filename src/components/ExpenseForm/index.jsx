import { useState } from "react";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { validateExpense } from "../../utils/validators";
import { todayISO } from "../../utils/format";

function ExpenseForm({ initialValues, categories = [], onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    description: initialValues?.description || "",
    amount: initialValues?.amount ?? "",
    date: initialValues?.date ? String(initialValues.date).slice(0, 10) : todayISO(),
    status: initialValues?.status || "PENDENTE",
    categoryId: initialValues?.categoryId || initialValues?.Category?.id || "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateExpense(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    onSubmit({ ...form, amount: Number(form.amount) });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Descrição"
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Ex.: Mercado"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Valor (R$)"
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          error={errors.amount}
          placeholder="0,00"
        />
        <Input
          label="Data"
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          error={errors.date}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Categoria"
          id="categoryId"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          error={errors.categoryId}
        >
          <option value="">Selecione...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          label="Status"
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="PENDENTE">Pendente</option>
          <option value="PAGA">Paga</option>
        </Select>
      </div>
      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;
