import Modal from "../Modal";
import Button from "../Button";

function ConfirmDialog({
  open,
  title = "Confirmar",
  message,
  confirmLabel = "Confirmar",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="text-sm text-gray-300">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
