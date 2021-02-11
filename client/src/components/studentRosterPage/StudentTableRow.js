import React, {useState} from 'react'
import {TableCell, TableRow, IconButton, Tooltip} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import EditStudentForm from './EditStudentForm'

const StudentTableRow = ({student, patchStudent, clearErrors}) => {
  const [editable, setEditable] = useState(false)


  const confirmDelete = () => {

  }
  
  const handleEdit = () => {
    setEditable(true)
  }

  const handleClose = () => {
    setEditable(false)
    clearErrors()
  }

  const updateEditable = () => {
    return setEditable(false)
  }

  if (editable) {
    return (
      <EditStudentForm 
        previousStudent={student}
        patchStudent={patchStudent}
        updateEditable={updateEditable}
        handleClose={handleClose}
      />
    )
  } else{
    return (
      <TableRow className= "students-table-row" key={student.id}>
      <TableCell component="th" scope="row">
        {student.firstName} {student.lastInitial}
      </TableCell>
      <TableCell align="center">{student.academicTier}</TableCell>
      <TableCell align="center">{student.socialEmotionalTier}</TableCell>
      <TableCell align="center">
      <Tooltip title="Edit">
        <IconButton className="edit-student-icon" aria-label="edit" color="inherit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton className="delete-student-icon" aria-label="delete" color="inherit" onClick={confirmDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      </TableCell>
    </TableRow>
    )
  }
}

export default StudentTableRow
