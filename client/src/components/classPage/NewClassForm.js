import React, {useState} from 'react'
import {Card, CardContent, CardActions, TextField, Button, Typography} from '@material-ui/core'

const NewClassForm = (props) => {
  const [newClassSection, setNewClassSection] =useState({})

  return (
    <Card className="new-class-form-card">
      <CardContent>
      <Typography className="new-class-form-header" variant='h4'>New Class</Typography>
      <form className="new-class-form" autoComplete="off" alignItems="baseline">
        <TextField required={true} className="new-class-form-field" id="new-class-name" label="Class Name" variant="filled"/>
      </form>
      </CardContent>
      <CardActions className="new-class-form-button">
        <Button variant="contained" size="medium" type='submit'>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default NewClassForm