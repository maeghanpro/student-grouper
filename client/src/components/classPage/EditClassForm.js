import React, {useState} from 'react'
import {Card, CardContent, CardActions, TextField, Button, IconButton, Tooltip} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import ErrorList from '../Alerts/ErrorList'

const EditClassForm = ({previousClassSection, patchClassSection, handleClose, updateEditable, errors}) => {
  const [classSection, setClassSection] = useState({
    name: previousClassSection.name,
    id: previousClassSection.id
  })

  const handleInputChange = (event) => {
    setClassSection({
      ...classSection,
      name: event.currentTarget.value
    })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (await patchClassSection(classSection)) {
      return updateEditable()
    }
  }

  return (
    <Card className="class-form-card">
      <Tooltip title="Close">
        <IconButton className="class-form-close-button" size="medium" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <CardContent>
      <ErrorList errors={errors} />
      <form className="edit-class-form" autoComplete="off" onSubmit={handleSave} >
          <TextField onChange={handleInputChange} value={classSection.name} className="class-form-field" label="Class Name*" id="edit-class-name" variant="outlined"/>
      </form>
      </CardContent>
      <CardActions className="class-form-button">
        <Button variant="contained" size="medium" onClick={handleSave} type='submit'>Save</Button>
      </CardActions>
    </Card>
  )
}

export default EditClassForm