const addRejectUnauthorizedApiRequest = (app) => {
  app.use((req, res, next) => {
    if (!req.user && req.url.startsWith('/api/')) {
      return res.status(401).json({errors: 'Api request unauthorized.'})
    } else {
      return next()
    }
  })
}

export default addRejectUnauthorizedApiRequest