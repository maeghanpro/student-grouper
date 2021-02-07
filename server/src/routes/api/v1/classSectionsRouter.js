import express from 'express'

import { User } from '../../../models/index.js'
import ClassSectionSerializer from '../../../serializers/ClassSectionSerializer.js'

const classSectionsRouter = new express.Router()

classSectionsRouter.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    const classSections = await user.$relatedQuery('classSections')
    const serializedClassSections = classSections.map(classSection => {
      return ClassSectionSerializer.getSummary(classSection)
    })
    return res.status(200).json({classSections: serializedClassSections})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

export default classSectionsRouter