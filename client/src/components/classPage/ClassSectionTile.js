import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Button, Typography, IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import EditClassForm from './EditClassForm'
import DeleteAlertDialog from '../Alerts/DeleteAlertDialog'

const ClassSectionTile = ({classSection, patchClassSection, errors, deleteClass}) => {
  const colorOptions = ["#795061", "#212E49", "#39565A", "#315E78", "#7C6764", "#7B717C", "#2E3F5A", "#908C5A", "#93995F", "#B56D5F", "#6D9885", "#E48B6B"]
  const randomIndex = Math.floor(Math.random() * colorOptions.length)
  const randomColor = colorOptions[randomIndex]
  const style = {
    background: randomColor,
    color: '#F3F3EE'
  }
  const [editable, setEditable] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false)

  const handleEdit = () => {
    setEditable(true)
  } 
  const handleClose = () => {
    setEditable(false)
  }

  const updateEditable = () => {
    return setEditable(false)
  }

  const confirmDelete = () => {
    setDeleteAlert(
      <DeleteAlertDialog 
        handleDelete={(confirmation) => {
          setShouldDelete(confirmation)
          setDeleteAlert(null)
        }}
        alertTitle={`Delete Class '${classSection.name}'?`}
        alertBody={`Deleting this class will also delete all of the associated students and groups.\nThis action cannot be undone`}
        alertReason='delete-class'
      />
    ) 
  }

  if (shouldDelete) {
    deleteClass(classSection.id)
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
        {deleteAlert}
        <Tooltip title="Delete">
          <IconButton className="delete-class-icon" aria-label="delete" color="inherit" onClick={confirmDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton className="edit-class-icon" aria-label="edit" color="inherit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <CardContent>
          <Typography variant="h3">{classSection.name}</Typography>
        </CardContent>
        <CardActions className="class-card-buttons" >
          <Link to={`/classes/${classSection.id}/students`}>
            <Button className="class-card-button" variant="contained" size="large">Students</Button>
          </Link>
          <Link to={`/classes/${classSection.id}/groups`}>
            <Button className="class-card-button" variant="contained" size="large">Groups</Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
  
}

export default ClassSectionTile