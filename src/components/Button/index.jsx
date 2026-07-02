import Spinner from "../Spinner";

const variants = {
  primary: "bg-primary hover:bg-primary-hover text-white",
  secondary: "bg-secondary hover:brightness-110 text-white",
  danger: "bg-danger hover:brightness-110 text-white",
  ghost: "bg-transparent border border-border text-gray-200 hover:bg-surface-2",
};

function Button({
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}

export default Button;
