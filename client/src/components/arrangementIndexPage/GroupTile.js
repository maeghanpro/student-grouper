import React from 'react'
import { Card, CardContent, Typography} from '@material-ui/core'
const GroupTile = ({group}) => {
  const colorOptions = ["#795061", "#212E49", "#39565A", "#315E78", "#7C6764", "#7B717C", "#2E3F5A", "#908C5A", "#93995F", "#B56D5F", "#6D9885", "#E48B6B"]
  const randomIndex = Math.floor(Math.random() * colorOptions.length)
  const randomColor = colorOptions[randomIndex]
  const style = {
    background: randomColor,
    color: '#F3F3EE'
  }
  const students = group.students.map( student => {
    return (
      <Typography key={student.id} variant='body1'>{student.firstName} {student.lastInitial}</Typography>
    )
  })
  return (
    <Card className="group-card" style={style} raised>
        <CardContent>
          <Typography variant="h3">{group.name}</Typography>
          {students}
        </CardContent>
      </Card>
  )
}

export default GroupTile