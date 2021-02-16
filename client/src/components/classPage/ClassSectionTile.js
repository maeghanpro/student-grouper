import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Button, Typography, IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import EditClassForm from './EditClassForm'
import DeleteAlertDialog from '../Alerts/DeleteAlertDialog'

const ClassSectionTile = ({classSection, patchClassSection, errors, deleteClass}) => {
  const style = {
    background: classSection.color,
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
        alertBody={`Deleting this class will also delete all of the associated students and groups.\nThis action cannot be undone.`}
        alertReason='delete-class'
      />
    ) 
  }

  let groupsButton = (
    <Link to={`/classes/${classSection.id}/groups`}>
      <Button className="class-card-button" variant="contained" size="large">Groups</Button>
  </Link>
  )
  if (classSection.students.length < 2) {
    groupsButton = (
        <Button disabled className="class-card-button" variant="contained" size="large">Groups</Button>
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
          {groupsButton}
        </CardActions>
      </Card>
    )
  }
  
}

export default ClassSectionTile