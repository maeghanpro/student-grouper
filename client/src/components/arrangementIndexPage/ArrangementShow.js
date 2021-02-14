import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'

import translateServerErrors from '../../services/translateServerErrors'
import GroupsGrid from './GroupsGrid'

const ArrangementShow = (props) => {
  const [classSection, setClassSection] = useState({
    groupSizeOptions: []
  })
  const [arrangements, setArrangements] = useState([])
  const [featuredArrangement, setFeaturedArrangement] = useState({
    groups: []
  })
  const [students, setStudents] = useState([])
  const [errors, setErrors] = useState({})
  const { id } = useParams()
  
  const clearErrors = () => {
    setErrors({})
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
      setStudents(body.classSection.students)
      if(body.classSection.arrangements.length > 0) {
        setFeaturedArrangement(body.classSection.arrangements[0])
      }
    } catch (error) {
      console.error(error)
    }
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
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
      const body = await response.json()
      setFeaturedArrangement(body.arrangement)
      setErrors({})
      return true
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="grid-container text-center">
      <GroupsGrid 
        arrangement={featuredArrangement}
        groupSizeOptions={classSection.groupSizeOptions}
        addArrangement={addArrangement}
        errors={errors}
        clearErrors={clearErrors}
      />
    </div>
  )
}

export default ArrangementShow