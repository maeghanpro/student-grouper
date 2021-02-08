import express from 'express'
import { ValidationError } from 'objection'

import { ClassSection, User } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import ClassSectionSerializer from '../../../serializers/ClassSectionSerializer.js'

const classSectionsRouter = new express.Router()

classSectionsRouter.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const classSections = await user.$relatedQuery('classSections').orderBy('name')
    const serializedClassSections = classSections.map(classSection => {
      return ClassSectionSerializer.getSummary(classSection)
    })
    return res.status(200).json({classSections: serializedClassSections})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

classSectionsRouter.post('/new', async (req, res) => {
  const userId = req.user.id
  const body = cleanUserInput(req.body)
  try {
    const classSection = await ClassSection.query().insertAndFetch({...body, userId})
    const serializedClassSection = ClassSectionSerializer.getSummary(classSection)
    return res.status(201).json({classSection: serializedClassSection})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({errors: error})
  }
})

classSectionsRouter.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const classSection = await ClassSection.query().findById(id)
    const serializedClassSection = await ClassSectionSerializer.getDetails(classSection)
    return res.status(200).json({classSection: serializedClassSection})
  } catch (error) {
    console.error(error)
    return res.status(500).json({errors: error})
  }
})
export default classSectionsRouter