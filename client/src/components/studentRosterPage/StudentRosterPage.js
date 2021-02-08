import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {Typography} from '@material-ui/core'

import StudentsTable from './StudentsTable'

const StudentRosterPage = (props) => {
  const [classSection, setClassSection] = useState({})
  const [students, setStudents] = useState([])
  const { id } = useParams() 

  const getStudents = async () => {
    try {
      const response = await fetch(`/api/v1/classes/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setClassSection(body.classSection)
      setStudents(body.classSection.students)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className="grid-container">
      <Typography className="text-center" variant="h1">
        {classSection.name} Roster
      </Typography>
      <StudentsTable students={students} />
    </div>
  )
}

export default StudentRosterPage