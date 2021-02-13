import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'

import ArrangementTableRow from './ArrangementTableRow'

const ArrangementTable = ({arrangements}) => {
  
  const rows = arrangements.map( arrangement => {
    return (
      <ArrangementTableRow 
        key={arrangement.id}
        arrangement={arrangement}
      />
    )
  })
  return (
    <TableContainer className="table" component={Paper}>
      <Table stickyHeader aria-label="groups table">
        <TableHead>
          <TableRow className='table-header-row'>
            <TableCell>Name</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Group Size</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ArrangementTable