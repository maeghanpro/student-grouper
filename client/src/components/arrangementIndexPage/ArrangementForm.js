import React, {useState} from 'react'
import { TextField, Button, Typography, FormControl, Select, MenuItem, InputLabel, Card, CardContent, CardActions} from '@material-ui/core'

const ArrangementForm = ({groupSizeOptions, addArrangement}) => {
  const [newArrangement, setNewArrangement] = useState({
    name: "",
    type: "",
    groupSize: ""
  })

  const handleInputChange = (event) => {
    setNewArrangement({
      ...newArrangement,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addArrangement(newArrangement)
    
  }
  
  const groupSizeMenuItems = groupSizeOptions.map( size => {
    return (
      <MenuItem key={size} value={size}>{size}</MenuItem>
    )
  })

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Create New Groups</Typography>
        <form onSubmit={handleSubmit}>
          <TextField required onChange={handleInputChange} name="name" value={newArrangement.name} label="Grouping Name" id="new-arrangement-name" variant="outlined"/>
          <FormControl variant="outlined">
            <InputLabel id="new-arrangement-type-label">Grouping Type*</InputLabel>
            <Select
              labelId="new-arrangement-type-label"
              id="new-arrangement-type"
              value={newArrangement.type}
              onChange={handleInputChange}
              label="Grouping Type*"
              inputProps={{
                name: "type"
              }}
            >
              <MenuItem value="">
                <em>Select Type</em>
              </MenuItem>
              <MenuItem value={"random"}>Random</MenuItem>
              <MenuItem value={"similar academicTier"}>Similar Academically</MenuItem>
              <MenuItem value={"similar socialEmotionalTier"}>Similar Socially</MenuItem>
              <MenuItem value={"varied academicTier"}>Varied Academically</MenuItem>
              <MenuItem value={"varied socialEmotionalTier"}>Varied Socially</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="new-arrangement-groupSize-label">Group Size*</InputLabel>
            <Select
              labelId="new-arrangement-groupSize-label"
              id="new-arrangement-groupSize"
              value={newArrangement.groupSize}
              onChange={handleInputChange}
              label="Group Size*"
              inputProps={{
                name: "groupSize"
              }}
            >
              <MenuItem value="">
                <em>Select Size</em>
              </MenuItem>
              {groupSizeMenuItems}
            </Select>
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="medium"
          onClick={handleSubmit}
          type="submit"
        >
        Submit</Button>
      </CardActions>
    </Card>
  )
}

export default ArrangementForm