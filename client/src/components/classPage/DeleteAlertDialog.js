import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteAlertDialog = ({handleDelete, classSectionName}) => {
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
        aria-labelledby="delete-alert-dialog-title"
        aria-describedby="delete-alert-dialog-description"
        className="delete-alert-dialog"
      >
        <DialogTitle id="delete-alert-dialog-title">{`Delete Class '${classSectionName}'?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-alert-dialog-description">
            Deleting this class will also delete all of the associated students and groups. 
            This action cannot be undone.
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