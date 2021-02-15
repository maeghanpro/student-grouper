import React, {useState} from 'react'
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import ArrangementForm from './ArrangementForm'
import ArrangementFormDialog from './ArrangementFormDialog'
import GroupTile from './GroupTile'
import DeleteAlertDialog from '../Alerts/DeleteAlertDialog'

const GroupsGrid = ({arrangement, groupSizeOptions, addArrangement, errors, clearErrors, deleteArrangement}) => {
  const [editable, setEditable] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false)

  const groupTiles = arrangement.groups.map(group => {
    return (
      <GroupTile 
        key={group.id}
        group={group}
      />
    )
  })

  const handleEdit = () => {
    setEditable(true)
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
      <Tooltip title="Delete">
        <IconButton className="delete-arrangement-icon" aria-label="delete" color="inherit" onClick={confirmDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton className="edit-arrangement-icon" aria-label="edit" color="inherit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
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
        <Typography className="text-center" variant="h6">
          {arrangement.createdAt} 
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <ArrangementFormDialog 
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
    </div>
  )
}

export default GroupsGrid