import express from 'express'

const classSectionsRouter = new express.Router()

classSectionsRouter.get('/', (req, res) => {
  res.send('Class Data')
})

export default classSectionsRouter