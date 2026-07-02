function EmptyState({ title = "Nada por aqui", message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
      <p className="font-medium text-gray-200">{title}</p>
      {message && <p className="max-w-sm text-sm text-gray-500">{message}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
