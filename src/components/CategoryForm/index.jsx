import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { validateCategory } from "../../utils/validators";

function CategoryForm({ initialValues, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateCategory(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Ex.: Alimentação"
      />
      <Input
        label="Descrição (opcional)"
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descrição da categoria"
      />
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

export default CategoryForm;
