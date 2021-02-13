import express from 'express'
import {ValidationError} from 'objection'

import {Arrangement, Group, Assignment, Student} from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import Grouping from '../../../services/Grouping.js'

const arrangementsRouter = new express.Router()

arrangementsRouter.post('/', async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
    const arrangement = await Arrangement.query().insertAndFetch(body)
  
    const students = await Student.query()
      .where(student => {
        student.where('isActive', true).where('classSectionId', body.classSectionId)
      })
    const groups = Grouping.generate(students, arrangement)
    arrangement.groups = await Promise.all(groups.map( async (group, index) => {
      const name = `Group ${index + 1}`
      const persistedGroup = await Group.query().insertAndFetch({name, arrangementId: arrangement.id})

      for (const student of group) {
        await Assignment.query().insert({groupId: persistedGroup.id, studentId: student.id})
      }

      persistedGroup.students = await persistedGroup.$relatedQuery('students')
      
      return persistedGroup
    }))
    debugger
    return res.status(201).json({arrangement})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({errors: error})
  }
})

export default arrangementsRouter