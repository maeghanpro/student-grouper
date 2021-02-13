import express from 'express'

import {ClassSection} from '../../../models/index.js'
import ClassSectionSerializer from '../../../serializers/ClassSectionSerializer.js'

const arrangementsRouter = new express.Router({mergeParams: true})

arrangementsRouter.get('/', async (req, res) => {
  const {id} = req.params
  try {
    const classSection = await ClassSection.query().findById(id)
    const serializedClassSection = await ClassSectionSerializer.getArrangementDetails(classSection)
    return res.status(200).json({classSection: serializedClassSection})
  } catch (error) {
    console.error(error)
    return res.status(500).json({errors: error})
  }
})

export default arrangementsRouter