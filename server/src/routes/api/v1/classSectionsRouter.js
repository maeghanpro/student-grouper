import express from 'express'

import { User } from '../../../models/index.js'

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

export default classSectionsRouter