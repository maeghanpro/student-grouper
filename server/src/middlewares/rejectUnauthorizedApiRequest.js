const rejectUnauthorizedApiRequest = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({errors: 'API request unauthorized.'})
  } else {
    return next()
  }
}

export default rejectUnauthorizedApiRequest