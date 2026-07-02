function Input({ label, id, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md border bg-surface-2 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-primary ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default Input;
