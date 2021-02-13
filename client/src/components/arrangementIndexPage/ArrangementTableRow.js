import React from 'react'
import {TableCell, TableRow} from '@material-ui/core'

const ArrangementTableRow = ({arrangement}) => {
  return (
    <TableRow className= "table-row">
      <TableCell component="th" scope="row">
        {arrangement.name}
      </TableCell>
      <TableCell align="center">{arrangement.type}</TableCell>
      <TableCell align="center">{arrangement.groupSize}</TableCell>
      <TableCell align="center">{arrangement.createdAt.slice(0, 10)}</TableCell>
    </TableRow>
  )
}

export default ArrangementTableRow