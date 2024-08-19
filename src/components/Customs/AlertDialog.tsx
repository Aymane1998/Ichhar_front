import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box } from '@mui/material';

interface ModalDeleteProps {
  open: any;
  handleClose: any;
  handleConfirm: any;
  confirmText: string;
  helpText?: string;
}

const AlertDialog: React.FC<ModalDeleteProps> = ({
  open,
  handleClose,
  handleConfirm,
  confirmText,
  helpText,
}) => (
  <React.Fragment>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Alert severity="warning">{confirmText}</Alert>
      </DialogTitle>
      <DialogContent>
        {helpText && (
          <DialogContentText id="alert-dialog-description">
            <Box>{helpText}</Box>
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handleConfirm} autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);

export default AlertDialog;
