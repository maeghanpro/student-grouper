import express from 'express'
import {ValidationError} from 'objection'

import cleanUserInput from '../../../services/cleanUserInput.js'
import {Student} from '../../../models/index.js'
import StudentSerializer from '../../../serializers/StudentSerializer.js'

const studentsRouter = new express.Router()

studentsRouter.post('/', async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
    await Student.query().insert(body)
    const students = await Student.query()
      .where( student => {
        student.where('isActive', true).where('classSectionId', body.classSectionId)
      })
      .orderBy('firstName')
    const serializedStudents = students.map(student => {
      return StudentSerializer.getSummary(student)
    })
    return res.status(201).json({students: serializedStudents})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

studentsRouter.patch('/', async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
    const student = await Student.query().patchAndFetchById(body.id, body)
    const classSection = await student.$relatedQuery('classSection')
    const students = await classSection.$relatedQuery('students')
      .where('isActive', true)
      .orderBy('firstName')
    const serializedStudents = students.map(student => {
      return StudentSerializer.getSummary(student)
    })
    return res.status(200).json({students: serializedStudents})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

studentsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const student = await Student.query().findById(id)
    const classSection = await student.$relatedQuery('classSection')
    await student.$relatedQuery('assignments').delete()
    await Student.query().deleteById(id)
    const students = await classSection.$relatedQuery('students')
      .where('isActive', true)
      .orderBy('firstName')
    const serializedStudents = students.map(student => {
      return StudentSerializer.getSummary(student)
    })
    return res.status(200).json({students: serializedStudents})
  } catch (error) {
    console.error(error)
    return res.status(500).json({errors: error})
  }
})
export default studentsRouter