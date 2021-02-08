import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {Typography} from '@material-ui/core'

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
  const studentNames = students.map(student => {
    return (
      <h2 key={student.id}>{student.firstName}</h2>
    )
  })
  useEffect(() => {
    getStudents()
  }, [])
  return (
    <div>
      <Typography className="text-center" variant="h1">
        {classSection.name} Roster
      </Typography>
      {studentNames}
    </div>
  )
}

export default StudentRosterPage