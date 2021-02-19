import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import translateServerErrors from '../../services/translateServerErrors'
import GroupsGrid from './GroupsGrid'
import ArrangementDrawer from './ArrangementDrawer'
import SuccessAlert from '../Alerts/SuccessAlert'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  }
}))

const ArrangementShow = (props) => {
  const classes = useStyles()
  const [classSection, setClassSection] = useState({
    groupSizeOptions: []
  })
  const [arrangements, setArrangements] = useState([])
  const [featuredArrangement, setFeaturedArrangement] = useState({
    groups: []
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const [initialFetchComplete, setInitialFetchComplete] = useState(false)
  const { id } = useParams()
  
  const clearErrors = () => {
    setErrors({})
  }

  const displaySuccess = (message) => {
    setSuccess(null)
    setSuccess(<SuccessAlert message={message}/>)
  }

  const getClassSectionData = async () => {
    try {
      const response = await fetch(`/api/v1/classes/${id}/arrangements`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setClassSection(body.classSection)
      setArrangements(body.classSection.arrangements)
      if(body.classSection.arrangements.length > 0) {
        setFeaturedArrangement(body.classSection.arrangements[0])
      }
    } catch (error) {
      console.error(error)
    }
    setInitialFetchComplete(true)
  }

  useEffect(() => {
    getClassSectionData()
  }, [])

  const addArrangement = async (arrangement) => {
    try {
      const response = await fetch('/api/v1/arrangements', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({...arrangement, classSectionId: classSection.id})
      })

      if(!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const errors = translateServerErrors(body.errors)
          setErrors(errors)
          return false
        } else {
          displaySuccess('Failed to create groups.')
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
      const body = await response.json()
      setClassSection(body.classSection)
      setArrangements(body.classSection.arrangements)
      setFeaturedArrangement(body.featuredArrangement)
      setErrors({})
      return true
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteArrangement = async (arrangementId) => {
    try {
      const response = await fetch(`/api/v1/arrangements/${arrangementId}`, {
        method: 'DELETE',
        headers: new Headers ({
          "Content-Type": "application/json"
        })
      })

      if(!response.ok) {
        displaySuccess('Failed to delete groups.')
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setClassSection(body.classSection)
      setArrangements(body.classSection.arrangements)
      if(body.classSection.arrangements.length > 0) {
        setFeaturedArrangement(body.classSection.arrangements[0])
      } else {
        setFeaturedArrangement({ groups: []})
      }
      displaySuccess('Groups deleted!')
    } catch (error) {
      console.error(error)
    }
  }

  const updateGroups = async (payload) => {
    try {
      const response = await fetch(`/api/v1/arrangements/${payload.arrangementId}/groups`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
      })

      if(!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const errors = translateServerErrors(body.errors)
          setErrors(errors)
          return false
        } else {
          displaySuccess('Failed to update group.')
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
        const body = await response.json()
        setArrangements(body.arrangements)
        setFeaturedArrangement(body.featuredArrangement)
        displaySuccess('Group updated!')
        setErrors({})
        return true
      }

    } catch (error) {
      console.error(error)
    }
  }

  const updateArrangement = async (payload) => {
    try {
      const response = await fetch(`/api/v1/arrangements/${payload.id}`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
      })

      if(!response.ok) {
        displaySuccess('Failed to update groups information.')
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setArrangements(body.arrangements)
      setFeaturedArrangement(body.featuredArrangement)
      displaySuccess('Groups information updated!')

    } catch (error) {
      console.error(error)
    }
  }

  const handleArrangementClick = (event) => {
    let id = event.currentTarget.className.split(' ')[1]
    id = parseInt(id)
    const arrangement = arrangements.find( arrangement => arrangement.id == id)
    setFeaturedArrangement(arrangement)
  }
  if (initialFetchComplete) {
    return (
      <div className={classes.root}>
        {success}
        <div className="grid-container text-center">
          <GroupsGrid 
            arrangement={featuredArrangement}
            groupSizeOptions={classSection.groupSizeOptions}
            addArrangement={addArrangement}
            errors={errors}
            clearErrors={clearErrors}
            deleteArrangement={deleteArrangement}
            updateGroups={updateGroups}
            updateArrangement={updateArrangement}
          />
        </div>
        <ArrangementDrawer 
          arrangements={arrangements}
          handleArrangementClick={handleArrangementClick}
          featuredArrangementId={featuredArrangement.id}
          groupSizeOptions={classSection.groupSizeOptions}
          addArrangement={addArrangement}
          errors={errors}
          clearErrors={clearErrors}
        />
      </div>
    )
  } else {
    return <CircularProgress className="circular-progress-icon" />
  }
}

export default ArrangementShow