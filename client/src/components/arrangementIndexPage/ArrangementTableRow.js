import React from 'react'
import { Link } from 'react-router-dom'
import {TableCell, TableRow} from '@material-ui/core'

const ArrangementTableRow = ({arrangement}) => {
  return (
    <TableRow className= "table-row">
      <TableCell component="th" scope="row">
        <Link to={`/groups/${arrangement.id}`}>
        {arrangement.name}
        </Link>
      </TableCell>
      <TableCell align="center">{arrangement.type}</TableCell>
      <TableCell align="center">{arrangement.groupSize}</TableCell>
      <TableCell align="center">{arrangement.createdAt.slice(0, 10)}</TableCell>
    </TableRow>
  )
}

export default ArrangementTableRow