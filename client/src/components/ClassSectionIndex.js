import React, { useState, useEffect } from 'react'
import { Typography, Grid, Fab, Container} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import ClassSectionTile from './ClassSectionTile'

const ClassSectionIndex = (props) => {
  const [classSections, setClassSections] = useState([])

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

  const classSectionTiles = classSections.map((classSection, index) => {
    let addFab;
    if (index === classSections.length - 1) {
      addFab = (
        <Fab className="add-class-fab" color="primary" aria-label="add new class">
          <AddIcon />
        </Fab>
      )
    }
    return (
      <Grid item xs={6} md={4} lg={3} key={classSection.id} >
        <ClassSectionTile classSection={classSection}/>
        {addFab}
      </Grid>
    )
  })

  return (
    <Container className="class-index-container" max-width="md">
      <Grid container alignContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography className="text-center" variant="h1">Classes</Typography>
        </Grid>
        <Grid container justify="flex-start" alignItems="baseline" spacing={3}>
          {classSectionTiles}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ClassSectionIndex