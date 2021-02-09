import React, {useState} from 'react'
import {Card, CardContent, CardActions, TextField, Button, Typography, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import ErrorList from '../ErrorList'

const NewClassForm = ({addNewClassSection, errors, closeForm}) => {
  const [newClassSection, setNewClassSection] =useState({ name: ""})

  const handleInputChange = (event) => {
    setNewClassSection({
      name: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
   if (await addNewClassSection(newClassSection)) {
     closeForm()
   }
  }
  return (
    <Card className="class-form-card">
      <IconButton className="class-form-close-button" size="small" aria-label="close" color="inherit" onClick={closeForm}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <CardContent>
      <Typography className="class-form-header" variant='h4'>New Class</Typography>
      <ErrorList errors={errors} />
      <form className="new-class-form" autoComplete="off" onSubmit={handleSubmit} >
          <TextField onChange={handleInputChange} value={newClassSection.name} className="class-form-field" label="Class Name*" id="new-class-name" variant="outlined"/>
      </form>
      </CardContent>
      <CardActions className="class-form-button">
        <Button variant="contained" size="medium" onClick={handleSubmit} type='submit'>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default NewClassForm