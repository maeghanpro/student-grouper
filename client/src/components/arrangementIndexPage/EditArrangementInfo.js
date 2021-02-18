import React, {useState} from 'react'
import {Button, Grid, Paper, Typography} from '@material-ui/core'

const EditArrangementInfo = ({thisArrangement, updateArrangement, closeForm}) => {
  const [arrangement, setArrangement] = useState({
    id: thisArrangement.id,
    name: thisArrangement.name,
    notes: thisArrangement.notes || ""
  })

  const handleInputChange = (event) => {
    setArrangement({
      ...arrangement,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateArrangement(arrangement)
    closeForm()
  }

  return (
    <form onSubmit={handleSubmit} className='edit-arrangement-form'>
      <Grid item xs={12}>
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            value={arrangement.name}
            className='edit-arrangement-name'
          />
      </Grid>
      <Grid container alignContent='center' justify='center' spacing={3}>
      <Grid xs={12} sm='auto' item>
        <Typography className="text-center" id="edit-arrangement-type-header" variant="h5">
          Type: {thisArrangement.type}                
        </Typography>
      </Grid>
      <Grid xs={12} sm='auto' item>
        <Typography className="text-center" id="edit-arrangement-date-header" variant="h5">
          Created {thisArrangement.createdAt} 
        </Typography>
      </Grid>
      </Grid>
      <Grid xs={12} item>
        <textarea
          name='notes'
          onChange={handleInputChange}
          value={arrangement.notes}
          className='edit-arrangement-notes'
        />
        <Button 
          variant='contained' 
          type='submit' 
          id='edit-arrangement-save-button'
          onClick={handleSubmit}
        >Save</Button>
      </Grid>
    </form>
  )
}

export default EditArrangementInfo