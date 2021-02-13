import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {Typography} from '@material-ui/core'

import ArrangementTable from './ArrangementTable'

const ArrangementIndex = (props) => {
  const [classSection, setClassSection] = useState({})
  const [arrangements, setArrangements] = useState([])
  const { id } = useParams()
  const getArrangements = async () => {
    try {
      const response = await fetch(`/api/v1/classes/${id}/arrangements`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      if(body.classSection.arrangements.length === 0) {
        // setRevealAddArrangementForm(true)
      }
      setClassSection(body.classSection)
      setArrangements(body.classSection.arrangements)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getArrangements()
  }, [])

  return (
    <div className="grid-container">
      <Typography className="text-center" variant="h1">
        {classSection.name} Groups
      </Typography>
      <div className="table-container">
        <ArrangementTable 
          arrangements={arrangements}
        />
      </div>
    </div>
  )
}

export default ArrangementIndex