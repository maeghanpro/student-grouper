import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Grid, Typography, Tooltip, IconButton, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import ArrangementForm from './ArrangementForm'
import GroupTile from './GroupTile'
import DeleteAlertDialog from '../Alerts/DeleteAlertDialog'

const GroupsGrid = ({
  arrangement, 
  groupSizeOptions, 
  addArrangement, 
  errors, 
  clearErrors, 
  deleteArrangement,
  updateGroups
}) => {
  const [editable, setEditable] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false)

  const groupTiles = arrangement.groups.map(group => {
    return (
      <Grid item key={group.id} style={{minWidth: 250}}>
        <GroupTile 
          group={group}
          groups={arrangement.groups}
          updateGroups={updateGroups}
          errors={errors}
          clearErrors={clearErrors}
        />
      </Grid>
    )
  })

  const handleEdit = () => {
    setEditable(!editable)
  } 

  const confirmDelete = () => {
    setDeleteAlert(
      <DeleteAlertDialog 
        handleDelete={(confirmation) => {
          setShouldDelete(confirmation)
          setDeleteAlert(null)
        }}
        alertTitle={`Delete Groups '${arrangement.name}'?`}
        alertBody={`This action cannot be undone`}
        alertReason='delete-groups'
      />
    ) 
  }

  if (arrangement.groups.length === 0) {
    return (
      <ArrangementForm 
        groupSizeOptions={groupSizeOptions}
        addArrangement={addArrangement}
        errors={errors}
        clearErrors={clearErrors}
      />
    )
  }
  if (shouldDelete) {
    deleteArrangement(arrangement.id)
    setShouldDelete(false)
  }
  return (
    <div>
      {deleteAlert}
      <Link to={`/classes/${arrangement.classSectionId}/students`}>
        <Button id='view-roster-button' size='large'>View Roster</Button>
      </Link>
      <Tooltip title="Delete">
        <IconButton id="delete-arrangement-icon" aria-label="delete" color="inherit" onClick={confirmDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton id="edit-arrangement-icon" aria-label="edit" color="inherit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Grid container alignContent="center" justify="center" spacing={1}>
        <Grid item xs={12}>
        <Typography className=" arrangement-header text-center" variant="h2">
          {arrangement.name} 
        </Typography>
        </Grid>
        <Grid xs={12} sm='auto' item>
        <Typography className="text-center" variant="h5">
          Type: {arrangement.type}                
        </Typography>
        </Grid>
        <Grid xs={12} sm='auto' item>
        <Typography className="text-center" variant="h5">
          Created {arrangement.createdAt} 
        </Typography>
        </Grid>
        <Grid xs={12} item>
        <Typography className="text-center" variant="h5">
          {arrangement.notes} 
        </Typography>
        </Grid>
        <Grid container justify="center" alignItems="stretch" spacing={3}>
          {groupTiles}
        </Grid>
      </Grid>
    </div>
  )
}

export default GroupsGrid