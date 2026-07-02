import Select from "../Select";
import Input from "../Input";
import Button from "../Button";

function ExpenseFilters({ filters, categories = [], onChange, onClear }) {
  function handleChange(e) {
    onChange({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="mb-6 rounded-lg border border-border bg-surface p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Categoria"
          name="categoryId"
          value={filters.categoryId}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="PAGA">Paga</option>
        </Select>
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Valor mín."
            name="minAmount"
            type="number"
            min="0"
            step="0.01"
            value={filters.minAmount}
            onChange={handleChange}
            placeholder="0"
          />
          <Input
            label="Valor máx."
            name="maxAmount"
            type="number"
            min="0"
            step="0.01"
            value={filters.maxAmount}
            onChange={handleChange}
            placeholder="—"
          />
        </div>
        <Input
          label="De"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
        />
        <Input
          label="Até"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
        />
        <div className="flex items-end">
          <Button variant="ghost" onClick={onClear} className="w-full">
            Limpar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;
