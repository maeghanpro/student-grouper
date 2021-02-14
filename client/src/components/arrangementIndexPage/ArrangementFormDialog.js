import React, {useState} from 'react'
import { TextField, Button, IconButton, FormControl, Select, MenuItem, InputLabel, Dialog, DialogActions, DialogTitle, DialogContent, Fab, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import ErrorList from '../Alerts/ErrorList'
const ArrangementFormDialog = ({groupSizeOptions, addArrangement, errors, clearErrors}) => {
  const [newArrangement, setNewArrangement] = useState({
    name: "",
    type: "",
    groupSize: ""
  })
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    clearErrors()
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setNewArrangement({
      ...newArrangement,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if ( await addArrangement(newArrangement)) {
      handleClose()
    }
  }
  
  const groupSizeMenuItems = groupSizeOptions.map( size => {
    return (
      <MenuItem key={size} value={size}>{size}</MenuItem>
    )
  })

  return (
    <div>
    <Tooltip title="Create Groups">
      <Fab onClick={handleClickOpen} className="class-fab" color="primary" aria-label="create groups">
        <AddIcon />
      </Fab>
    </Tooltip>
      <Dialog maxWidth='lg' className="arrangement-form-dialog" open={open} onClose={handleClose} aria-labelledby="create-new-groups-form" disableBackdropClick>
        <Tooltip title="Close">
          <IconButton className="arrangement-form-close-button" size="medium" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <DialogTitle id="create-new-groups-form" variant='h4'>Create New Groups</DialogTitle>
        <DialogContent className="arrangement-form-content">
          <ErrorList errors={errors}/>
          <form onSubmit={handleSubmit} className="arrangement-form">
            <TextField className="arrangement-name" onChange={handleInputChange} name="name" value={newArrangement.name} label="Name*" id="new-arrangement-name" variant="outlined"/>
            <FormControl variant="outlined" className="arrangement-form-type" >
              <InputLabel id="new-arrangement-type-label">Type*</InputLabel>
              <Select
                labelId="new-arrangement-type-label"
                id="new-arrangement-type"
                value={newArrangement.type}
                onChange={handleInputChange}
                label="Type*"
                inputProps={{
                  name: "type"
                }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value={"random"}>Random</MenuItem>
                <MenuItem value={"similar academicTier"}>Similar Academically</MenuItem>
                <MenuItem value={"similar socialEmotionalTier"}>Similar Socially</MenuItem>
                <MenuItem value={"varied academicTier"}>Varied Academically</MenuItem>
                <MenuItem value={"varied socialEmotionalTier"}>Varied Socially</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="arrangement-form-size" variant="outlined">
              <InputLabel id="new-arrangement-groupSize-label">Group Size*</InputLabel>
              <Select
                labelId="new-arrangement-groupSize-label"
                id="new-arrangement-groupSize"
                value={newArrangement.groupSize}
                onChange={handleInputChange}
                label="Group Size*"
                inputProps={{
                  name: "groupSize"
                }}
              >
                <MenuItem value="">
                  <em>Select Size</em>
                </MenuItem>
                {groupSizeMenuItems}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        <Button
          variant="contained"
          size="medium"
          onClick={handleSubmit}
          type="submit"
          className="arrangement-submit-button"
        >
        Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ArrangementFormDialog