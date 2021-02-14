import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import ArrangementForm from './ArrangementForm'
import GroupTile from './GroupTile'

const GroupsGrid = ({arrangement, groupSizeOptions, addArrangement, errors, clearErrors}) => {
  const groupTiles = arrangement.groups.map(group => {
    return (
      <GroupTile 
        key={group.id}
        group={group}
      />
    )
  })

  return (
    <Grid container alignContent="center" justify="center" spacing={3}>

      <Grid item xs={12}>
      <Typography className=" arrangement-header text-center" variant="h2">
        {arrangement.name} 
      </Typography>
      </Grid>
      <Grid xs={12} sm='auto' item>
      <Typography className="text-center" variant="h5">
        {arrangement.type}                
      </Typography>
      </Grid>
      <Grid xs={12} sm='auto' item>
      <Typography className="text-center" variant="h5">
        {arrangement.createdAt} 
      </Typography>
      </Grid>
      <Grid item xs={12}>
        <ArrangementForm 
          groupSizeOptions={groupSizeOptions}
          addArrangement={addArrangement}
          errors={errors}
          clearErrors={clearErrors}
        />
      </Grid>
      <Grid container justify="space-evenly" spacing={3}>
        {groupTiles}
      </Grid>
    </Grid>
  )
}

export default GroupsGrid