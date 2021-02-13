import express from 'express'
import {ValidationError} from 'objection'

import {Arrangement, Group, Assignment, Student} from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import Grouping from '../../../services/Grouping.js'
import ArrangementSerializer from '../../../serializers/ArrangementSerializer.js'
import GroupSerializer from '../../../serializers/GroupSerializer.js'

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
    const serializedArrangement = ArrangementSerializer.formatValues(arrangement)
 
    serializedArrangement.groups = await Promise.all(groups.map( async (group, index) => {
      const name = `Group ${index + 1}`
      const persistedGroup = await Group.query().insertAndFetch({name, arrangementId: arrangement.id})
      
      console.log('group', group)

      for (const student of group) {
        await Assignment.query().insert({groupId: persistedGroup.id, studentId: student.id})
      }

      const serializedGroup = await GroupSerializer.getDetails(persistedGroup)
      
      return serializedGroup
    }))

    return res.status(201).json({arrangement: serializedArrangement})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

export default arrangementsRouter