const typeStyles = {
  success: "border-secondary",
  error: "border-danger",
  info: "border-primary",
};

function Toast({ toast, onClose }) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-md border-l-4 bg-surface px-4 py-3 shadow-lg min-w-64 max-w-sm ${
        typeStyles[toast.type] || typeStyles.info
      }`}
    >
      <span className="flex-1 text-sm text-gray-100">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-200 leading-none"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}

export default Toast;
