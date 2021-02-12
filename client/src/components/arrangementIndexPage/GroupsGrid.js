import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import GroupTile from './GroupTile'

const GroupsGrid = ({arrangement}) => {
  let date
  if (arrangement.createdAt) {
    const splitDate = arrangement.createdAt.slice(0, 10).split('-')
    date = [splitDate[1], splitDate[2], splitDate[0]].join('-')
  }

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
      <Typography className="text-center" variant="h2">
        {arrangement.name} 
      </Typography>
      </Grid>
      <Grid item>
      <Typography className="text-center" variant="subtitle1">
        Type: {arrangement.type}                
      </Typography>
      </Grid>
      <Grid item>
      <Typography className="text-center" variant="subtitle1">
        Created: {date} 
      </Typography>
      </Grid>
      <Grid container justify="space-evenly" spacing={3}>
        {groupTiles}
      </Grid>
    </Grid>
  )
}

export default GroupsGrid