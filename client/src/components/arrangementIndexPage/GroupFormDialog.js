import React, {useState} from 'react'
import { TextField, Button, IconButton, FormControl, Select, MenuItem, InputLabel, Dialog, DialogActions, DialogTitle, DialogContent, Tooltip} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'

import ErrorList from '../Alerts/ErrorList'

const GroupFormDialog = ({thisGroup, groups, updateGroups, errors, clearErrors}) => {
  const [group, setGroup] = useState({
    ...thisGroup,
    studentToMove: '',
    destination: ''
  })
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    clearErrors()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setGroup({
      ...group,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateGroups(group)
    handleClose()
  }

  const studentMenuItems = thisGroup.students.map( student => {
    return <MenuItem key={student.id} value={student.id}>
      {student.firstName} {student.lastInitial}
    </MenuItem>
  })

  const groupMenuItems = groups.map( group => {
    if (group.id != thisGroup.id) {
      return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
    }
  })

  return (
    <div>
          <Tooltip title="Edit">
      <IconButton className="edit-group-icon" aria-label="edit" color="inherit" onClick={handleClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
      <Dialog maxWidth='lg' className="group-form-dialog" open={open} onClose={handleClose} aria-labelledby="edit-group-form" disableBackdropClick>
        <Tooltip title="Close">
          <IconButton className="group-form-close-button" size="medium" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <DialogTitle id="edit-group-form" variant='h4'>Edit Group</DialogTitle>
        <DialogContent className="group-form-content">
          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit} className="group-form">
            <TextField className="group-name" onChange={handleInputChange} name="name" value={group.name} label="Name*" id="edit-group-name" variant="outlined"/>
            <FormControl variant="outlined" className="group-form-student" >
              <InputLabel id="edit-group-student-label">Student to Move</InputLabel>
              <Select
                labelId="edit-group-student-label"
                id="edit-group-student"
                value={group.studentToMove}
                onChange={handleInputChange}
                label="Student to Move"
                inputProps={{
                  name: "studentToMove"
                }}
              >
                <MenuItem value="">
                  <em>Select Student</em>
                </MenuItem>
                {studentMenuItems}
              </Select>
            </FormControl>
            <FormControl className="group-form-destination" variant="outlined">
              <InputLabel id="edit-group-destination-label">Destination*</InputLabel>
              <Select
                labelId="edit-group-destination-label"
                id="edit-group-destination"
                value={group.destination}
                onChange={handleInputChange}
                label="Destination*"
                inputProps={{
                  name: "destination"
                }}
              >
                <MenuItem value="">
                  <em>Select Destination</em>
                </MenuItem>
                {groupMenuItems}
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
          className="group-submit-button"
        >
        Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default GroupFormDialog