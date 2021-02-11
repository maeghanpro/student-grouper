import React, {useState} from 'react'
import {TableCell, TableRow, TextField, Button, MenuItem, FormControl, Select, InputLabel, Tooltip, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const EditStudentForm = ({previousStudent, patchStudent, handleClose, updateEditable}) => {
  const [student, setStudent] = useState({
    firstName: previousStudent.firstName,
    lastInitial: previousStudent.lastInitial,
    academicTier: previousStudent.academicTier,
    socialEmotionalTier: previousStudent.socialEmotionalTier,
    id: previousStudent.id
  })

  const handleInputChange = (event) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value
    })
  }
  const handleSave = async (event) => {
    event.preventDefault()
    if (await patchStudent(student)) {
      updateEditable(false)
    }
  }

  return (
    <TableRow>
      <TableCell>
          <TextField className="firstName-field" onChange={handleInputChange} name="firstName" value={student.firstName} label="First Name*" id="edit-student-firstName" variant="outlined"/>
          <TextField className="lastInitial-field" onChange={handleInputChange} name="lastInitial" value={student.lastInitial} label="Last Initial*" id="edit-student-lastInitial" variant="outlined"/>
      </TableCell>
      <TableCell align="center">
        <FormControl variant="outlined">
          <InputLabel id="edit-student-academic-label">Academic Tier*</InputLabel>
          <Select
            labelId="edit-student-academicTier-label"
            id="edit-student-academicTier"
            value={student.academicTier}
            onChange={handleInputChange}
            label="Academic Tier*"
            inputProps={{
              name: "academicTier"
            }}
          >
            <MenuItem value="">
              <em>Select Tier</em>
            </MenuItem>
            <MenuItem value={1}>1 - No support</MenuItem>
            <MenuItem value={2}>2 - Some support</MenuItem>
            <MenuItem value={3}>3 - High support</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <FormControl variant="outlined">
          <InputLabel id="edit-student-socialEmotionalTier-label">Social-Emotional Tier*</InputLabel>
          <Select
            labelId="edit-student-socialEmotionalTier-label"
            id="edit-student-socialEmotionalTier"
            value={student.socialEmotionalTier}
            onChange={handleInputChange}
            label="Social-Emotional Tier*"
            inputProps={{
              name: "socialEmotionalTier"
            }}
          >
            <MenuItem value="">
              <em>Select Tier</em>
            </MenuItem>
            <MenuItem value={1}>1 - No support</MenuItem>
            <MenuItem value={2}>2 - Some support</MenuItem>
            <MenuItem value={3}>3 - High support</MenuItem>
          </Select>
        </FormControl>
        </TableCell>
        <TableCell>
          <Button id="save-student-button" variant="contained" size="medium" onClick={handleSave} type='submit'>Save</Button>
          <Tooltip title="Close">
          <IconButton className="student-form-close-button" size="medium" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default EditStudentForm