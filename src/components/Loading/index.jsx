import Spinner from "../Spinner";

function Loading({ label = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
      <Spinner size={32} className="text-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default Loading;
