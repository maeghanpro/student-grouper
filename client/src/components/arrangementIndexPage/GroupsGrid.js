import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Grid, Typography, Tooltip, IconButton, Button, Paper } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import ArrangementForm from './ArrangementForm'
import GroupTile from './GroupTile'
import DeleteAlertDialog from '../Alerts/DeleteAlertDialog'
import EditArrangementInfo from './EditArrangementInfo'

const GroupsGrid = ({
  arrangement, 
  groupSizeOptions, 
  addArrangement, 
  errors, 
  clearErrors, 
  deleteArrangement,
  updateGroups,
  updateArrangement
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

  let header;
  if (editable) {
    header = <EditArrangementInfo 
      thisArrangement={arrangement}
      updateArrangement={updateArrangement}
      closeForm={handleEdit}
    />
  } else {
    header = (
      <>
        <Grid item xs={12}>
          <Typography className=" arrangement-header text-center" variant="h2">
            {arrangement.name} 
          </Typography>
        </Grid>
        <Grid xs={12} sm='auto' item>
          <Typography className="text-center" id="arrangement-type-header" variant="h5">
            Type: {arrangement.type}                
          </Typography>
        </Grid>
        <Grid xs={12} sm='auto' item>
          <Typography className="text-center" id="arrangement-date-header" variant="h5">
            Created {arrangement.createdAt} 
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Paper variant="outlined" id="arrangement-notes-box">
            {arrangement.notes || `Click edit to add notes about ${arrangement.name}`} 
          </Paper>  
        </Grid>
      </>
    )
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
      <Grid container alignContent="center" justify="center" spacing={2}>
        {header}
        <Grid container justify="center" alignItems="stretch" spacing={3}>
          {groupTiles}
        </Grid>
      </Grid>
    </div>
  )
}

export default GroupsGrid