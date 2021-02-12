import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {Typography, Fab, Button, Tooltip, CircularProgress} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import GroupsGrid from './GroupsGrid'
import ArrangementForm from './ArrangementForm'

const ArrangementShow = (props) => {
  const [classSection, setClassSection] = useState({})
  const [arrangements, setArrangements] = useState([])
  const [featuredArrangement, setFeaturedArrangement] = useState({groups: []})
  const [students, setStudents] = useState([])
  const [revealArrangementForm, setRevealArrangementForm] = useState(false)
  const { id } = useParams()

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
      setStudents(body.classSection.students)
      if(body.classSection.arrangements.length === 0) {
        setRevealArrangementForm(true)
      } else {
        setFeaturedArrangement(body.classSection.arrangements[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getClassSectionData()
  }, [])

  const makeArrangement = async (arrangementData) => {
    try {
      const response = await fetch(`api/v1/classes/${id}/arrangements/new`, {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify(arrangementData)
      })

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setFeaturedArrangement(body.arrangement)
    } catch (error) {
      
    }
  }

  const handleOpenFormClick = () => {
    setRevealArrangementForm(true)        
  }

  let fab= (
    <Tooltip title="Create Groups">
      <Fab onClick={handleOpenFormClick} className="class-fab" color="primary" aria-label="create groups">
        <AddIcon />
      </Fab>
    </Tooltip>
  )

  if (revealArrangementForm) {
    return (
      <ArrangementForm groupSizeOptions={classSection.groupSizeOptions}/>
    )
  } 

  return (
    <div className="grid-container text-center">
      <GroupsGrid arrangement={featuredArrangement}/>
      {fab}
    </div>
  )
}

export default ArrangementShow