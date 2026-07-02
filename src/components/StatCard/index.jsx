function StatCard({ label, value, icon, accent = "text-primary" }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5">
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2">
          <img src={icon} alt="" className="h-6 w-6" />
        </div>
      )}
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
