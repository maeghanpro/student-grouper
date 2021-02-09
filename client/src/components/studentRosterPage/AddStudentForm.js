import React, {useState} from 'react'
import {TableCell, TableRow, TextField, Button, MenuItem, FormControl, Select, InputLabel} from '@material-ui/core'

const AddStudentForm = ({addNewStudent, classSectionId, closeForm}) => {
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastInitial: "",
    academicTier: "",
    socialEmotionalTier: ""
  })

  const handleInputChange = (event) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (await addNewStudent({...newStudent, classSectionId})) {
      setNewStudent({
        firstName: "",
        lastInitial: "",
        academicTier: "",
        socialEmotionalTier: ""
      })
      closeForm()
    } 
  }

  return (
    <TableRow>
      <TableCell>
          <TextField onChange={handleInputChange} name="firstName" value={newStudent.firstName} placeholder="First Name" label="First Name*" id="new-student-firstName" variant="outlined"/>
          <TextField className="lastInitial-field" onChange={handleInputChange} name="lastInitial" value={newStudent.lastInitial} placeholder="Last Initial" label="Last Initial*" id="new-student-lastInitial" variant="outlined"/>
      </TableCell>
      <TableCell align="center">
        <FormControl variant="outlined">
          <InputLabel id="new-student-academic-label">Academic Tier*</InputLabel>
          <Select
            labelId="new-student-academicTier-label"
            id="new-student-academicTier"
            value={newStudent.academicTier}
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
          <InputLabel id="new-student-socialEmotionalTier-label">Social-Emotional Tier*</InputLabel>
          <Select
            labelId="new-student-socialEmotionalTier-label"
            id="new-student-socialEmotionalTier"
            value={newStudent.socialEmotionalTier}
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
        <Button id="submit-new-student-button" variant="contained" size="medium" onClick={handleSubmit} type='submit'>Submit</Button>
      </TableCell>
    </TableRow>
  )
}

export default AddStudentForm