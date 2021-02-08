import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'

const StudentsTable = ({students}) => {

  const rows = students.map((student) => {
    return (
      <TableRow key={student.id}>
        <TableCell component="th" scope="row">
          {student.firstName}
        </TableCell>
        <TableCell>{student.lastInitial}</TableCell>
        <TableCell align="right">{student.academicTier}</TableCell>
        <TableCell align="right">{student.socialEmotionalTier}</TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="students table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Last Initial</TableCell>
            <TableCell align="right">Academic Tier</TableCell>
            <TableCell align="right">Social-Emotional Tier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentsTable