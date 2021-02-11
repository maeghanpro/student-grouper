import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {Typography, Fab, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import translateServerErrors from '../../services/translateServerErrors'

import StudentsTable from './StudentsTable'
import ErrorList from '../ErrorList'
import SuccessAlert from '../SuccessAlert'

const StudentRosterPage = (props) => {
  const [classSection, setClassSection] = useState({})
  const [students, setStudents] = useState([])
  const [revealAddStudentForm, setRevealAddStudentForm] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const { id } = useParams() 

  const displaySuccess = (message) => {
    setSuccess(null)
    setSuccess(<SuccessAlert message={message}/>)
  }

  const getStudents = async () => {
    try {
      const response = await fetch(`/api/v1/classes/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      if(body.classSection.students.length === 0) {
        setRevealAddStudentForm(true)
      }
      setClassSection(body.classSection)
      setStudents(body.classSection.students)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  const addNewStudent = async (newStudent) => {
    try {
      const response = await fetch('/api/v1/students', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify(newStudent)
      })
      if (!response.ok) {
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
        setStudents(body.students)
        displaySuccess('New student added!')
        setErrors({})
        return true
      }
    } catch (error) {
      console.error(error)
    }
  }
  const patchStudent = async (student) => {
    try {
      const response = await fetch('/api/v1/students', {
        method: 'PATCH',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify(student)
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
        setStudents(body.students)
        displaySuccess('Student updated!')
        setErrors({})
        return true
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenFormClick = () => {
    setRevealAddStudentForm(true)        
  }

  const handleCloseFormClick = () => {
    setRevealAddStudentForm(false)
    setErrors({})
  }

  const clearErrors = () => {
    setErrors({})
  }

  let fab = (
    <Tooltip title="Add Student">
      <Fab onClick={handleOpenFormClick} className="student-fab" color="primary" aria-label="add new student">
        <AddIcon />
      </Fab>
    </Tooltip>
  )

  if(revealAddStudentForm) {
    fab = undefined
  }

  return (
    <div className="grid-container ">
      <Typography className="text-center" variant="h1">
        {classSection.name} Roster
      </Typography>
      {success}
      <div className="new-student-form-errors">
        <ErrorList errors={errors}/>
      </div>
      {fab}
      <div className="students-table-container">
        <StudentsTable 
          students={students}
          revealAddStudentForm={revealAddStudentForm}
          addNewStudent={addNewStudent}
          classSectionId={classSection.id} 
          closeForm={handleCloseFormClick}
          patchStudent={patchStudent}
          clearErrors={clearErrors}
        />
      </div>
    </div>
  )
}

export default StudentRosterPage