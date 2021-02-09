import React, {useState} from 'react'
import {Card, CardContent, CardActions, TextField, Button, Typography} from '@material-ui/core'

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
    <Card className="new-class-form-card">
      <CardContent>
      <Typography className="new-class-form-header" variant='h4'>New Class</Typography>
      <ErrorList errors={errors} />
      <form className="new-class-form" autoComplete="off" onSubmit={handleSubmit} >
          <TextField onChange={handleInputChange} value={newClassSection.name} className="new-class-form-field" label="Class Name*" id="new-class-name" variant="outlined"/>
      </form>
      </CardContent>
      <CardActions className="new-class-form-button">
        <Button variant="contained" size="medium" onClick={handleSubmit} type='submit'>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default NewClassForm