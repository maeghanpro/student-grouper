import React, { useState, useEffect } from 'react'
import { Typography, Grid, Fab, Container} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import translateServerErrors from '../../services/translateServerErrors'
import ClassSectionTile from './ClassSectionTile'
import NewClassForm from './NewClassForm'

const ClassSectionIndex = (props) => {
  const [classSections, setClassSections] = useState([])
  const [revealClassForm, setRevealClassForm] =useState(false)
  const [errors, setErrors] = useState({})

  const getClassSections = async () => {
    try {
      const response = await fetch('/api/v1/classes')

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      if(body.classSections.length === 0) {
        setRevealClassForm(true)
      }
      setClassSections(body.classSections)

    } catch (error) {
      console.error(error)
    }
  }

  const addNewClassSection = async (newClassSection) => {
    try {
      const response = await fetch('/api/v1/classes', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify(newClassSection)
      })

      if(!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const errors = translateServerErrors(body.errors)
          setErrors(errors)
          return false
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
        const body = await response.json()
        setClassSections([
          ...classSections,
          body.classSection
        ])
        setErrors({})
        return true
      }

    } catch (error) {
      console.error(error)
    }
  }

  const patchClassSection = async (classSection) => {
    try {
      const response = await fetch('/api/v1/classes', {
        method: 'PATCH',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify(classSection)
      })
      if(!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const errors = translateServerErrors(body.errors)
          setErrors(errors)
          return false
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
        const body = await response.json()
        setClassSections(body.classSections)
        setErrors({})
        return true
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`)
    }
  }

  useEffect(() => {
    getClassSections()
  }, [])


  const handleOpenFormClick = () => {
    setRevealClassForm(true)        
  }

  const handleCloseFormClick = () => {
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
      <Grid item xs={12} sm={6} md={4}>
        <NewClassForm 
          addNewClassSection={addNewClassSection}
          errors={errors}
          closeForm={handleCloseFormClick}
        />
      </Grid>
    )
    fab = undefined
  }
  
  const classSectionTiles = classSections.map((classSection, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={classSection.id} >
        <ClassSectionTile 
          classSection={classSection}
          patchClassSection={patchClassSection}
          errors={errors}
        />
      </Grid>
    )
  })

  return (
    <div className="grid-container class-index-container">
      <Typography className="class-index-header text-center" variant="h1">Classes</Typography>
      {fab}
      <Grid container alignContent="center" spacing={3}>
        <Grid container justify="space-evenly" spacing={3}>
          {classSectionTiles}
          {newClassForm}
        </Grid>
      </Grid>
    </div>
  )
}

export default ClassSectionIndex