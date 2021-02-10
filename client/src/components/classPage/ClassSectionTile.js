import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Button, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import EditClassForm from './EditClassForm'

const ClassSectionTile = ({classSection, patchClassSection, errors}) => {
  const colorOptions = ["#795061", "#212E49", "#39565A", "#315E78", "#7C6764", "#7B717C", "#2E3F5A", "#908C5A", "#93995F", "#B56D5F", "#6D9885", "#E48B6B"]
  const randomIndex = Math.floor(Math.random() * colorOptions.length)
  const randomColor = colorOptions[randomIndex]
  const style = {
    background: randomColor,
    color: '#F3F3EE'
  }
  const [editable, setEditable] = useState(false)

  const handleEdit = () => {
    setEditable(true)
  } 
  const handleClose = () => {
    setEditable(false)
  }

  const updateEditable = () => {
    return setEditable(false)
  }

  if (editable) {
    return <EditClassForm 
        previousClassSection={classSection}
        patchClassSection={patchClassSection}
        handleClose={handleClose}
        updateEditable={updateEditable}
        errors={errors}
      />
  } else {
    return (
      <Card className="class-card" style={style} raised>
        <IconButton className="edit-class-icon" aria-label="edit" color="inherit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h3">{classSection.name}</Typography>
        </CardContent>
        <CardActions className="class-card-buttons" >
          <Link to={`/classes/${classSection.id}`}>
            <Button className="class-card-button" variant="contained" size="large">Students</Button>
          </Link>
          <Button className="class-card-button" variant="contained" size="large">Groups</Button>
        </CardActions>
      </Card>
    )
  }
  
}

export default ClassSectionTile