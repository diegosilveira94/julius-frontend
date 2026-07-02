const map = {
  PAGA: "bg-secondary/15 text-secondary",
  PENDENTE: "bg-tertiary/15 text-tertiary",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        map[status] || "bg-surface-2 text-gray-300"
      }`}
    >
      {status === "PAGA" ? "Paga" : "Pendente"}
    </span>
  );
}

export default StatusBadge;
