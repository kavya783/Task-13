import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import Colors from "../Colors";
import { Theme } from "../GlobalStyles";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{fontSize:Theme.font16Bold,color:Colors.black}}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{fontSize:Theme. font14SemiBold,color:Colors.black}}>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} sx={{color:Colors.black,}}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
         sx={{color:Colors.black,bgcolor:Colors.red}}
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}