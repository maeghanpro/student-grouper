import React, {useState} from 'react'
import {Snackbar, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const SuccessAlert = ({message}) => {
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default SuccessAlert