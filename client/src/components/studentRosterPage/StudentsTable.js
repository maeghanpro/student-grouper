import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'

import AddStudentForm from './AddStudentForm'

const StudentsTable = ({students, revealAddStudentForm, addNewStudent, classSectionId, closeForm}) => {
  let firstRow
  if (revealAddStudentForm) {
    firstRow = (
      <AddStudentForm 
        addNewStudent={addNewStudent}
        classSectionId={classSectionId}
        closeForm={closeForm}
      />
    )
  }
  
  const rows = students.map((student) => {
    return (
      <TableRow className= "students-table-row" key={student.id}>
        <TableCell component="th" scope="row">
          {student.firstName} {student.lastInitial}
        </TableCell>
        <TableCell align="center">{student.academicTier}</TableCell>
        <TableCell align="center">{student.socialEmotionalTier}</TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer className="students-table" component={Paper}>
      <Table stickyHeader aria-label="students table">
        <TableHead>
          <TableRow className='students-table-header-row'>
            <TableCell>Student Name</TableCell>
            <TableCell align="center">Academic Tier</TableCell>
            <TableCell align="center">Social-Emotional Tier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {firstRow}
        {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentsTable