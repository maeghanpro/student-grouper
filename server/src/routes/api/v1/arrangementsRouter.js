import express from 'express'
import {ValidationError} from 'objection'

import {Arrangement, Group, Assignment, Student, ClassSection} from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import Grouping from '../../../services/Grouping.js'
import ArrangementSerializer from '../../../serializers/ArrangementSerializer.js'
import GroupSerializer from '../../../serializers/GroupSerializer.js'
import ClassSectionSerializer from '../../../serializers/ClassSectionSerializer.js'

const arrangementsRouter = new express.Router()

arrangementsRouter.post('/', async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
    const arrangement = await Arrangement.query().insertAndFetch(body)
    const students = await Student.query().where('classSectionId', body.classSectionId)
    const groups = Grouping.generate(students, arrangement)
    const serializedArrangement = ArrangementSerializer.formatValues(arrangement)
 
    serializedArrangement.groups = await Promise.all(groups.map( async (group, index) => {
      const name = `Group ${index + 1}`
      const persistedGroup = await Group.query().insertAndFetch({name, arrangementId: arrangement.id})

      for (const student of group) {
        await Assignment.query().insert({groupId: persistedGroup.id, studentId: student.id})
      }

      const serializedGroup = await GroupSerializer.getDetails(persistedGroup)
      
      return serializedGroup
    }))

    const classSection = await ClassSection.query().findById(body.classSectionId)
    const serializedClassSection = await ClassSectionSerializer.getDetails(classSection)

    return res.status(201).json({featuredArrangement: serializedArrangement, classSection: serializedClassSection})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

arrangementsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const arrangement = await Arrangement.query().findById(id)
    const classSection = await arrangement.$relatedQuery('classSection')
    const relatedGroups = await arrangement.$relatedQuery('groups')

    await Promise.all(relatedGroups.map( group => {
      return group.$relatedQuery('assignments').delete()
    }))
    await Group.query().where('arrangementId', id).delete()
    await Arrangement.query().deleteById(id)
    
    const serializedClassSection = await ClassSectionSerializer.getDetails(classSection)

    return res.status(200).json({classSection: serializedClassSection})

  } catch (error) {
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

arrangementsRouter.patch('/:id/groups', async (req, res) => {
  const {id} = req.params
  const body = cleanUserInput(req.body)
  try {
    await Group.query().findById(body.id).patch({name: body.name})
    if (body.studentToMove) {
      if (body.destination) {
        console.log(`studentId: ${body.studentToMove} groupId: ${body.id}`)
        const assignment = await Assignment.query()
          .where('studentId', body.studentToMove)
          .andWhere('groupId', body.id)
        console.log(assignment[0].id)
        await Assignment.query().findById(assignment[0].id).patch({groupId: body.destination})
      } else {
        throw new ValidationError({
          type: 'ModelValidation', 
          data: {
            destination: [{
              message: 'is a required property',
              keyword: 'required',
              params: null
            }]
          }
        })
      }
    }

    const arrangement = await Arrangement.query().findById(id)
    const featuredArrangement = await ArrangementSerializer.getDetails(arrangement)
    const arrangements = await Arrangement.query().where('classSectionId', arrangement.classSectionId)
    const serializedArrangements = await Promise.all(arrangements.map(arrangement => {
      return ArrangementSerializer.getDetails(arrangement)
    }))

    return res.status(200).json({featuredArrangement, arrangements: serializedArrangements})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

export default arrangementsRouter