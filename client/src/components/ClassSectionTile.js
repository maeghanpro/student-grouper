import React from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core'

const ClassSectionTile = ({classSection}) => {
  const colorOptions = ["#795061", "#212E49", "#39565A", "#315E78", "#7C6764", "#7B717C", "#2E3F5A", "#908C5A"]
  const randomIndex = Math.floor(Math.random() * colorOptions.length)
  const randomColor = colorOptions[randomIndex]
  const style = {
    background: randomColor,
    color: '#F3F3EE'
  }
  return (
    <Card className="class-card" style={style} raised>
      <CardContent>
        <Typography variant="h3">{classSection.name}</Typography>
      </CardContent>
      <CardActions className="class-card-buttons" >
        <Button className="class-card-button" variant="contained" size="large">Students</Button>
        <Button className="class-card-button" variant="contained" size="large">Groups</Button>
      </CardActions>
    </Card>
  )
}

export default ClassSectionTile