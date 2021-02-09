import React, {useState} from 'react'
import {Card, CardContent, CardActions, TextField, Button, Typography, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const EditClassForm = ({previousClassSection, patchClassSection, handleClose, updateEditable}) => {
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
    <Card className="edit-class-form-card">
      <IconButton className="edit-class-form-close-button" size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <CardContent>
      <Typography className="edit-class-form-header" variant='h4'>Edit Class</Typography>
      <form className="edit-class-form" autoComplete="off" onSubmit={handleSave} >
          <TextField onChange={handleInputChange} value={classSection.name} className="edit-class-form-field" label="Class Name*" id="edit-class-name" variant="outlined"/>
      </form>
      </CardContent>
      <CardActions className="edit-class-form-button">
        <Button variant="contained" size="medium" onClick={handleSave} type='submit'>Save</Button>
      </CardActions>
    </Card>
  )
}

export default EditClassForm