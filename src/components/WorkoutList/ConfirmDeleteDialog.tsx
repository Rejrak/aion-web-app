import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteDialog = ({ open, onConfirm, onCancel }: ConfirmDeleteDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Sei sicuro di voler eliminare l'esercizio?</DialogTitle>
    <DialogActions>
      <Button onClick={onCancel}>Annulla</Button>
      <Button color="error" onClick={onConfirm}>Elimina</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
