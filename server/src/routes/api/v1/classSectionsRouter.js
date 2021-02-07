import express from 'express'
import { ValidationError } from 'objection'

import { ClassSection, User } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

const classSectionsRouter = new express.Router()

classSectionsRouter.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const classSections = await user.$relatedQuery('classSections')
    return res.status(200).json({classSections})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

classSectionsRouter.post('/new', async (req, res) => {
  const userId = req.user.id
  const body = cleanUserInput(req.body)
  try {
    const classSection = await ClassSection.query().insertAndFetch({...body, userId})
    console.log(classSection)
    return res.status(201).json({classSection})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({errors: error})
  }
})

export default classSectionsRouter