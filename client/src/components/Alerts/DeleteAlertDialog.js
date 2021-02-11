import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteAlertDialog = ({handleDelete, alertTitle, alertBody, alertReason}) => {
  const [open, setOpen] = useState(true)

  const handleCancel = () => {
    handleDelete(false)
    setOpen(false);
  };
  const handleProceed = () => {
    handleDelete(true)
    setOpen(false);
  };
  return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby={`${alertReason}-alert-dialog-title`}
        aria-describedby={`${alertReason}-alert-dialog-description`}
        className="delete-alert-dialog"
      >
        <DialogTitle id={`${alertReason}-alert-dialog-title`}>{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`${alertReason}-alert-dialog-description`}>
            {alertBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="dialog-cancel-button" variant="contained" onClick={handleCancel} color="inherit" autoFocus>
            Cancel
          </Button>
          <Button className="dialog-proceed-button" variant="contained" onClick={handleProceed} color="inherit">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteAlertDialog