import React, { useState, useEffect } from 'react'
import { Typography, Grid, Fab, Container} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';

import ClassSectionTile from './ClassSectionTile'
import NewClassForm from './NewClassForm'

const ClassSectionIndex = (props) => {
  const [classSections, setClassSections] = useState([])
  const [revealClassForm, setRevealClassForm] =useState(false)
  const getClassSections = async () => {
    try {
      const response = await fetch('/api/v1/classes')

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setClassSections(body.classSections)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getClassSections()
  }, [])


  const handleOpenFormClick = (event) => {
    event.preventDefault()
    setRevealClassForm(true)        
  }

  const handleCloseFormClick = (event) => {
    event.preventDefault()
    setRevealClassForm(false)
  }
  let newClassForm;
  let fab= (
    <Fab onClick={handleOpenFormClick} className="class-fab" color="primary" aria-label="add new class">
      <AddIcon />
    </Fab>
  )

  if (revealClassForm) {
    newClassForm = (
      <Grid item xs={6} md={4} lg={3}>
        <NewClassForm/>
      </Grid>
    )
    fab = (
      <Fab onClick={handleCloseFormClick} className="class-fab" color="primary" aria-label="close form">
        <CloseIcon />
      </Fab>
    )
  }

  
  
  const classSectionTiles = classSections.map((classSection, index) => {
    return (
      <Grid item xs={6} md={4} lg={3} key={classSection.id} >
        <ClassSectionTile classSection={classSection}/>
      </Grid>
    )
  })

  return (
    <Container className="class-index-container" max-width="md">
      <Grid container alignContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography className="class-index-header text-center" variant="h1">Classes</Typography>
        </Grid>
        <Grid container justify="space-evenly" spacing={3}>
          {classSectionTiles}
          {newClassForm}
        </Grid>
      </Grid>
      {fab}
    </Container>
  )
}

export default ClassSectionIndex